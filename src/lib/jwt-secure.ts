import { SignJWT, jwtVerify } from "jose";

export interface RateLimitPayload {
    userId: string;
    count: number;
    date: string; // YYYY-MM-DD format
    iat?: number;
    exp?: number;
}

const TOKEN_KEY = "gemini_Morlabs_rate_limit_token";
const MAX_REQUESTS = 3;

// Get secret from environment variable
const getSecret = (): Uint8Array => {
    const secret = process.env.JWT_SECRET_KEY 
    if (!secret) {
        throw new Error("JWT_SECRET_KEY is not set in environment variables");
    }
    return new TextEncoder().encode(secret);
};

// For client-side: Get secret from API or use a different approach
// Since we can't use server secrets on client, we'll validate server-side only
export const createRateLimitToken = async (payload: Omit<RateLimitPayload, "iat" | "exp">): Promise<string> => {
    const secret = getSecret();
    const today = new Date().toISOString().split("T")[0];
    
    const jwt = await new SignJWT({
        userId: payload.userId,
        count: payload.count,
        date: today,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h") // Token expires in 24 hours
        .sign(secret);

    return jwt;
};

export const verifyRateLimitToken = async (token: string): Promise<RateLimitPayload | null> => {
    try {
        const secret = getSecret();
        const { payload } = await jwtVerify(token, secret);
        
        return {
            userId: payload.userId as string,
            count: payload.count as number,
            date: payload.date as string,
            iat: payload.iat as number,
            exp: payload.exp as number,
        };
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};

// Client-side helper to get token from localStorage
export const getStoredToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
};

// Client-side helper to save token to localStorage
export const saveStoredToken = (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
};

// Client-side helper to clear token
export const clearStoredToken = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
};
