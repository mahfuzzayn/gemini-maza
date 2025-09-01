export interface Root {
    response: GeminiResponse;
}

export interface GeminiResponse {
    response: {
        sdkHttpResponse: SdkHttpResponse;
        candidates: Candidate[];
        modelVersion: string;
        responseId: string;
        usageMetadata: UsageMetadata;
    };
}

export interface SdkHttpResponse {
    headers: Headers;
}

export interface Headers {
    "alt-svc": string;
    "content-encoding": string;
    "content-type": string;
    date: string;
    server: string;
    "server-timing": string;
    "transfer-encoding": string;
    vary: string;
    "x-content-type-options": string;
    "x-frame-options": string;
    "x-xss-protection": string;
}

export interface Candidate {
    content: Content;
    finishReason: string;
    index: number;
}

export interface Content {
    parts: Part[];
    role: string;
}

export interface Part {
    text: string;
}

export interface UsageMetadata {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: PromptTokensDetail[];
    thoughtsTokenCount: number;
}

export interface PromptTokensDetail {
    modality: string;
    tokenCount: number;
}
