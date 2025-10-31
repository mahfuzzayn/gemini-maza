// Simple JWT-like token system using localStorage
// For production, use proper JWT with httpOnly cookies

export interface RateLimitToken {
    count: number;
    date: string; // YYYY-MM-DD format
    userId: string;
}

// Client-side JWT helpers that work with the API
// Only stores JWT token string in localStorage, all validation happens server-side

export interface RateLimitInfo {
    remaining: number;
    count: number;
    token: string;
}

// localStorage key for storing JWT token (NOT the secret key!)
const STORAGE_KEY = "gemini_Morlabs_rate_limit_token";

/**
 * Get JWT token from localStorage
 */
export const getStoredToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY);
};

/**
 * Save JWT token to localStorage
 */
export const saveStoredToken = (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, token);
};

/**
 * Remove JWT token from localStorage
 */
export const clearStoredToken = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get or create rate limit token from API
 * Validates existing token server-side or creates new one
 */
export const getOrCreateToken = async (): Promise<RateLimitInfo> => {
    const storedToken = getStoredToken();
    
    try {
        const response = await fetch("/api/rate-limit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: storedToken || null,
                action: storedToken ? "verify" : "create",
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to get rate limit token");
        }

        const data = await response.json();
        
        // Save validated/created token to localStorage (only JWT token string)
        if (typeof window !== "undefined" && data.token) {
            saveStoredToken(data.token);
        }

        return {
            remaining: data.remaining,
            count: data.count,
            token: data.token,
        };
    } catch (error) {
        console.error("Error getting rate limit token:", error);
        // Return default values on error
        return {
            remaining: 0,
            count: 0,
            token: "",
        };
    }
};

/**
 * Check remaining requests by validating token server-side
 */
export const getRemainingRequests = async (): Promise<number> => {
    try {
        const info = await getOrCreateToken();
        return info.remaining;
    } catch (error) {
        console.error("Error getting remaining requests:", error);
        return 0;
    }
};

/**
 * Check if user can make request by validating token server-side
 */
export const canMakeRequest = async (): Promise<{ allowed: boolean; remaining: number }> => {
    try {
        const info = await getOrCreateToken();
        return {
            allowed: info.remaining > 0,
            remaining: info.remaining,
        };
    } catch (error) {
        console.error("Error checking rate limit:", error);
        return {
            allowed: false,
            remaining: 0,
        };
    }
};