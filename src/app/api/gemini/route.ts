import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function POST(request: Request) {
    const { question } = await request.json();

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
    });

    return Response.json({ response });
}
