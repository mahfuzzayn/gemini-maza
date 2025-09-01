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
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { geminiFormValidationSchema } from "./Gemini/geminiFormValidation";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { GeminiResponse } from "@/types";
import ReactMarkDown from "react-markdown";

const Gemini = () => {
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState<GeminiResponse | null>(null);

    const form = useForm({
        resolver: zodResolver(geminiFormValidationSchema),
        defaultValues: {
            question: "",
        },
    });

    const {
        formState: { isValid, isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setLoading(true);

            const res = await fetch(`/api/gemini`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            form.reset();
            setLoading(false);
            setAnswer(result?.response?.candidates[0]?.content?.parts[0]?.text);
        } catch (error) {
            form.reset();
            setAnswer(null);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex justify-center items-center gap-4"
                >
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem className="w-full max-w-[760px]">
                                <FormLabel>Ask anything</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Type your desired text here..."
                                        className="w-full p-4 !text-[17px]"
                                        {...field}
                                    />
                                </FormControl>
                                <div className="flex justify-between">
                                    {!isValid ? (
                                        <FormMessage />
                                    ) : (
                                        <FormDescription>
                                            Gemini can make mistakes.
                                        </FormDescription>
                                    )}
                                    <Button
                                        type="submit"
                                        className="cursor-pointer mt-2 text-md font-semibold relative -top-[3px]"
                                    >
                                        Get Answer
                                    </Button>
                                </div>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className="answer-container w-full max-w-[760px] mx-auto mt-5 p-4">
                {loading && isSubmitting && (
                    <Skeleton className="p-4 bg-blue-200 rounded-none">
                        <p className="text-center">Preparing the answer...</p>
                    </Skeleton>
                )}
                {!loading && answer && (
                    <div className="p-4 bg-blue-200">
                        <ReactMarkDown>{`${answer}`}</ReactMarkDown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gemini;
