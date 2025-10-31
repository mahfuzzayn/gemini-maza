import { NextRequest, NextResponse } from "next/server";
import { createRateLimitToken, verifyRateLimitToken } from "@/lib/jwt-secure";

const MAX_REQUESTS = 3;

export async function POST(request: NextRequest) {
    try {
        const { token, action } = await request.json();

        // If no token, create a new one
        if (!token || action === "create") {
            const userId = `user_${Math.random().toString(36).substring(7)}`;
            const today = new Date().toISOString().split("T")[0];
            
            const newToken = await createRateLimitToken({
                userId,
                count: 0,
                date: today,
            });

            return NextResponse.json({
                token: newToken,
                remaining: MAX_REQUESTS,
                count: 0,
            });
        }

        // If token exists, verify it
        if (action === "verify") {
            const payload = await verifyRateLimitToken(token);
            
            if (!payload) {
                // Invalid token, create new one
                const userId = `user_${Math.random().toString(36).substring(7)}`;
                const today = new Date().toISOString().split("T")[0];
                
                const newToken = await createRateLimitToken({
                    userId,
                    count: 0,
                    date: today,
                });

                return NextResponse.json({
                    token: newToken,
                    remaining: MAX_REQUESTS,
                    count: 0,
                    refreshed: true,
                });
            }

            const today = new Date().toISOString().split("T")[0];
            
            // Check if token is from today
            if (payload.date !== today) {
                // Different day, reset count
                const newToken = await createRateLimitToken({
                    userId: payload.userId,
                    count: 0,
                    date: today,
                });

                return NextResponse.json({
                    token: newToken,
                    remaining: MAX_REQUESTS,
                    count: 0,
                    refreshed: true,
                });
            }

            // Token is valid and from today
            const remaining = Math.max(0, MAX_REQUESTS - payload.count);
            
            return NextResponse.json({
                token: token, // Return same token if still valid
                remaining,
                count: payload.count,
                refreshed: false,
            });
        }

        return NextResponse.json(
            { error: "Invalid action" },
            { status: 400 }
        );
    } catch (error: any) {
        console.error("Rate limit API error:", error);
        return NextResponse.json(
            { error: "Failed to process rate limit request", message: error.message },
            { status: 500 }
        );
    }
}
