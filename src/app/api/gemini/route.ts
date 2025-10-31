import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { verifyRateLimitToken, createRateLimitToken } from "@/lib/jwt-secure";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MAX_REQUESTS = 3;

export async function POST(request: NextRequest) {
    try {
        const { question, token } = await request.json();

        if (!question) {
            return NextResponse.json(
                { error: "Question is required" },
                { status: 400 }
            );
        }

        if (!token) {
            return NextResponse.json(
                { error: "Rate limit token is required" },
                { status: 401 }
            );
        }

        // Verify and validate the JWT token
        const payload = await verifyRateLimitToken(token);

        if (!payload) {
            return NextResponse.json(
                {
                    error: "Invalid or tampered token",
                    message: "Your token is invalid. Please refresh the page.",
                },
                { status: 401 }
            );
        }

        const today = new Date().toISOString().split("T")[0];

        // Check if token is from a different day
        if (payload.date !== today) {
            // Reset for new day
            const newToken = await createRateLimitToken({
                userId: payload.userId,
                count: 1,
                date: today,
            });

            // Process the request
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: question,
            });

            return NextResponse.json({
                response,
                token: newToken,
                remaining: MAX_REQUESTS - 1,
                count: 1,
            });
        }

        // Check if user has exceeded limit
        if (payload.count >= MAX_REQUESTS) {
            return NextResponse.json(
                {
                    error: "Rate limit exceeded",
                    message: "You have reached the daily limit of 3 requests. Please try again tomorrow.",
                    remaining: 0,
                },
                { status: 429 }
            );
        }

        // Increment count and create new token
        const newToken = await createRateLimitToken({
            userId: payload.userId,
            count: payload.count + 1,
            date: today,
        });

        // Make the AI request
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
        });

        return NextResponse.json({
            response,
            token: newToken,
            remaining: MAX_REQUESTS - (payload.count + 1),
            count: payload.count + 1,
        });
    } catch (error: any) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            { error: "Failed to process request", message: error.message },
            { status: 500 }
        );
    }
}
