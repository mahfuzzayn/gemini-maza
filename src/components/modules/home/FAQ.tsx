"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is Gemini by Morlabs?",
            answer: "Gemini by Morlabs is an AI-powered question-answering platform built on Google's Gemini 2.5 Flash model. It provides instant, intelligent responses to any question you have.",
        },
        {
            question: "How accurate are the answers?",
            answer: "Gemini by Morlabs uses Google's advanced Gemini AI model, which provides highly accurate answers. However, like all AI systems, it's recommended to verify important information from authoritative sources.",
        },
        {
            question: "Is my data safe?",
            answer: "Yes! We take your privacy seriously. Your questions are processed securely, and we don't store your personal data without permission. All data transmission is encrypted.",
        },
        {
            question: "Can I use it for free?",
            answer: "Yes! We offer a free tier with 10 questions per day. For unlimited access and premium features, check out our Pro and Enterprise plans.",
        },
        {
            question: "What makes this different from other AI assistants?",
            answer: "Gemini by Morlabs combines the power of Google's Gemini AI with a beautiful neobrutalism design, providing a unique user experience that's both powerful and visually striking.",
        },
        {
            question: "Do you offer API access?",
            answer: "Yes! API access is available for Pro and Enterprise plan users. Contact us for more details on integration and usage limits.",
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="w-full py-12 sm:py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto font-semibold">
                            Everything you need to know about Gemini by Morlabs
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="neobrutalism-card bg-white overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                                >
                                    <h3 className="text-lg font-black pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="border-2 border-black bg-primary flex-shrink-0 w-8 h-8 flex items-center justify-center">
                                        {openIndex === index ? (
                                            <ChevronUp className="h-5 w-5 text-primary-foreground" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-primary-foreground" />
                                        )}
                                    </div>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-6 pt-0 border-t-4 border-black">
                                        <p className="text-foreground/80 font-medium leading-relaxed pt-4">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
