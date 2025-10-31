"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { geminiFormValidationSchema } from "./Gemini/geminiFormValidation";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { GeminiResponse } from "@/types";
import ReactMarkDown from "react-markdown";
import { Send, Bot, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { getOrCreateToken, canMakeRequest, getRemainingRequests, getStoredToken, saveStoredToken } from "@/lib/jwt";

const Gemini = () => {
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState<GeminiResponse | null>(null);
    const [remainingRequests, setRemainingRequests] = useState(3);
    const [currentToken, setCurrentToken] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const form = useForm({
        resolver: zodResolver(geminiFormValidationSchema),
        defaultValues: {
            question: "",
        },
    });

    const {
        formState: { isValid, isSubmitting },
    } = form;

    // Initialize token on mount - properly refresh if new day
    useEffect(() => {
        const initializeToken = async () => {
            // Always call API to verify/refresh token on page load
            const info = await getOrCreateToken();
            setCurrentToken(info.token);
            setRemainingRequests(info.remaining);
        };
        
        initializeToken();
    }, []);

    // Check remaining requests when token or answer changes
    useEffect(() => {
        const checkRemaining = async () => {
            if (!currentToken) return;
            
            const remaining = await getRemainingRequests();
            setRemainingRequests(remaining);
        };
        
        // Check immediately and then periodically
        checkRemaining();
        const interval = setInterval(checkRemaining, 10000); // Check every 10 seconds
        
        return () => clearInterval(interval);
    }, [currentToken, answer]);

    const handleCopyAnswer = () => {
        if (answer) {
            navigator.clipboard.writeText(answer);
            setCopied(true);
            toast.success("Copied to Clipboard!", {
                description: "Answer has been copied to your clipboard.",
                duration: 2000,
            });
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // Always refresh token before checking (ensures date check)
        let token = currentToken || getStoredToken();
        
        // Refresh token to ensure it's up to date (handles new day reset)
        const tokenInfo = await getOrCreateToken();
        token = tokenInfo.token;
        setCurrentToken(token);
        setRemainingRequests(tokenInfo.remaining);

        // Check rate limit before making request
        const rateLimitCheck = await canMakeRequest();
        
        if (!rateLimitCheck.allowed) {
            toast.error("Daily Limit Reached", {
                description: "You've reached your daily limit of 3 questions. Please try again tomorrow!",
                duration: 7000,
            });
            return;
        }

        try {
            setLoading(true);
            setAnswer(null);

            const res = await fetch(`/api/gemini`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    question: data.question,
                    token: token,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    // Invalid token, refresh it
                    const info = await getOrCreateToken();
                    setCurrentToken(info.token);
                    setRemainingRequests(info.remaining);
                    
                    toast.error("Session Expired", {
                        description: "Your session expired. Please try again.",
                        duration: 5000,
                    });
                    setLoading(false);
                    return;
                }
                
                if (res.status === 429) {
                    // Rate limit exceeded
                    toast.error("Daily Limit Reached", {
                        description: result.message || "Daily limit reached. Please try again tomorrow!",
                        duration: 7000,
                    });
                    setLoading(false);
                    
                    // Refresh token to get updated count
                    const info = await getOrCreateToken();
                    setCurrentToken(info.token);
                    setRemainingRequests(info.remaining);
                    return;
                }
                throw new Error(result.message || "Request failed");
            }

            // Save new token from response
            if (result.token) {
                saveStoredToken(result.token);
                setCurrentToken(result.token);
                setRemainingRequests(result.remaining);
            }

            form.reset();
            setLoading(false);
            setAnswer(result?.response?.candidates[0]?.content?.parts[0]?.text);

            // Show success toast
            if (result.remaining === 0) {
                toast.warning("Last Question Today!", {
                    description: "That was your last question for today! Come back tomorrow for more.",
                    duration: 5000,
                });
            } else {
                toast.success("Question Answered!", {
                    description: `${result.remaining} question${result.remaining !== 1 ? "s" : ""} remaining today.`,
                    duration: 3000,
                });
            }
        } catch (error: any) {
            form.reset();
            setAnswer(null);
            setLoading(false);
            toast.error("Request Failed", {
                description: error.message || "Failed to get answer. Please try again.",
                duration: 5000,
            });
            console.error(error);
        }
    };

    const [rateLimitCheck, setRateLimitCheck] = React.useState({ allowed: true, remaining: 3 });

    // Check rate limit status
    useEffect(() => {
        const checkLimit = async () => {
            const check = await canMakeRequest();
            setRateLimitCheck(check);
        };
        checkLimit();
    }, [remainingRequests, currentToken]);

    return (
        <section id="ask" className="w-full py-12 sm:py-16 lg:py-24 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-black bg-primary mb-4">
                            <Bot className="h-10 w-10 text-primary-foreground" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Ask Gemini Anything
                        </h2>
                        <p className="text-foreground/80 max-w-2xl mx-auto font-semibold">
                            Get intelligent, instant answers powered by Google's Gemini AI. 
                            Simply type your question and let AI do the rest.
                        </p>
                        
                        {/* Rate Limit Display */}
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-white font-black">
                            <span className="text-sm">
                                {remainingRequests} question{remainingRequests !== 1 ? "s" : ""} remaining today
                            </span>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="neobrutalism-card bg-white p-6 sm:p-8">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="text-base font-black">
                                                Your Question
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Type your question here... (e.g., 'Explain quantum computing', 'Write a poem about AI', 'Help me with coding')"
                                                    className="w-full min-h-[120px] p-4 text-base resize-none border-4 border-black focus:border-primary transition-colors font-medium"
                                                    disabled={loading || !rateLimitCheck.allowed}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                {!isValid ? (
                                                    <FormMessage />
                                                ) : (
                                                    <FormDescription className="text-sm font-semibold">
                                                        {rateLimitCheck.allowed 
                                                            ? "Gemini can make mistakes. Always verify important information."
                                                            : "Daily limit reached. Try again tomorrow!"
                                                        }
                                                    </FormDescription>
                                                )}
                                                <Button
                                                    type="submit"
                                                    disabled={loading || !isValid || !rateLimitCheck.allowed}
                                                    className="w-full sm:w-auto min-w-[160px] neobrutalism-button bg-primary text-primary-foreground font-black disabled:opacity-50 disabled:cursor-not-allowed"
                                                    size="lg"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : !rateLimitCheck.allowed ? (
                                                        "Limit Reached"
                                                    ) : (
                                                        <>
                                                            <Send className="mr-2 h-4 w-4" />
                                                            Get Answer
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>

                        {/* Answer Container - Enhanced Styling */}
                        <div className="mt-8 space-y-4">
                            {loading && isSubmitting && (
                                <div className="border-4 border-dashed border-black bg-primary/10 p-6">
                                    <Skeleton className="h-4 w-full mb-2 bg-primary/20 border-2 border-black" />
                                    <Skeleton className="h-4 w-5/6 mb-2 bg-primary/20 border-2 border-black" />
                                    <Skeleton className="h-4 w-4/6 bg-primary/20 border-2 border-black" />
                                    <p className="text-center text-sm font-black mt-4">
                                        Gemini is thinking...
                                    </p>
                                </div>
                            )}
                            {!loading && answer && (
                                <div className="border-4 border-black bg-gradient-to-br from-primary/5 via-white to-primary/10 p-6 sm:p-8 neobrutalism-card">
                                    {/* Header with Copy Button */}
                                    <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b-4 border-black">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="flex-shrink-0 w-12 h-12 border-2 border-black bg-primary flex items-center justify-center">
                                                <Bot className="h-7 w-7 text-primary-foreground" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-foreground mb-1">
                                                    Gemini's Response
                                                </h3>
                                                <p className="text-xs font-semibold text-foreground/70">
                                                    AI-generated answer
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleCopyAnswer}
                                            variant="outline"
                                            size="sm"
                                            className="border-2 border-black font-bold hover:bg-black hover:text-white transition-colors"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="mr-2 h-4 w-4" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Enhanced Markdown Content */}
                                    <div className="gemini-answer-content prose prose-base sm:prose-lg max-w-none dark:prose-invert 
                                        prose-headings:font-black prose-headings:text-foreground prose-headings:mb-4 prose-headings:mt-6
                                        prose-h1:text-3xl prose-h1:border-b-4 prose-h1:border-black prose-h1:pb-3 prose-h1:mb-6
                                        prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-black/30 prose-h2:pb-2 prose-h2:mb-4
                                        prose-h3:text-xl prose-h3:font-black prose-h3:mb-3
                                        prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base sm:prose-p:text-lg
                                        prose-a:text-primary prose-a:font-bold prose-a:underline prose-a:underline-offset-2
                                        prose-strong:text-foreground prose-strong:font-black
                                        prose-ul:list-none prose-ul:pl-0 prose-ul:mb-4
                                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                                        prose-li:mb-2 prose-li:text-foreground/90 prose-li:text-base sm:prose-li:text-lg
                                        prose-li:before:content-['▸'] prose-li:before:font-black prose-li:before:text-primary prose-li:before:mr-2
                                        prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:my-4
                                        prose-code:text-primary prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-sm prose-code:border prose-code:border-black/20
                                        prose-pre:bg-muted prose-pre:border-4 prose-pre:border-black prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-4
                                        prose-pre:code:bg-transparent prose-pre:code:border-0 prose-pre:code:p-0
                                        prose-hr:border-black prose-hr:border-t-2 prose-hr:my-6
                                        prose-img:border-4 prose-img:border-black prose-img:my-4 prose-img:rounded-none
                                        prose-table:border-4 prose-table:border-black prose-table:w-full prose-table:my-4
                                        prose-th:border-2 prose-th:border-black prose-th:bg-primary/20 prose-th:p-3 prose-th:font-black
                                        prose-td:border-2 prose-td:border-black prose-td:p-3">
                                        <ReactMarkDown>{`${answer}`}</ReactMarkDown>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Examples */}
                    {!answer && !loading && rateLimitCheck.allowed && (
                        <div className="mt-8">
                            <p className="text-sm font-black mb-4 text-center">
                                Try asking:
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {[
                                    "Explain machine learning",
                                    "Write a haiku",
                                    "Best practices for React",
                                ].map((example, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            form.setValue("question", example);
                                            form.trigger("question");
                                        }}
                                        className="text-xs border-2 border-black font-bold hover:bg-black hover:text-white"
                                    >
                                        {example}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Gemini;
