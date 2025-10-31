"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Globe, Brain } from "lucide-react";
import bannerImg from "@/assets/images/gemini-banner.jpg";

const HeroSection = () => {
    return (
        <section id="home" className="hero-section relative overflow-hidden py-12 sm:py-16 lg:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black bg-primary text-primary-foreground font-black mb-4">
                            <Sparkles className="h-4 w-4" />
                            Powered by Gemini 2.5 Flash
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                            Ask Anything with{" "}
                            <span className="text-primary">Gemini by Morlabs</span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 font-semibold">
                            Experience the power of Google's Gemini AI. Get instant, intelligent
                            answers to your questions with our seamless interface.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button asChild size="lg" className="neobrutalism-button bg-primary text-primary-foreground font-black text-lg px-8 py-6">
                                <a href="#ask">
                                    Start Asking
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-4 border-black font-black text-lg px-8 py-6">
                                <a href="#features">Learn More</a>
                            </Button>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                            <div className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white font-bold">
                                <Zap className="h-4 w-4 text-primary" />
                                <span className="text-sm">Fast Responses</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white font-bold">
                                <Globe className="h-4 w-4 text-primary" />
                                <span className="text-sm">AI Powered</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white font-bold">
                                <Brain className="h-4 w-4 text-primary" />
                                <span className="text-sm">Smart & Accurate</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg">
                            <div className="neobrutalism-card bg-white p-4">
                                <Image
                                    src={bannerImg}
                                    alt="Gemini Banner Image"
                                    height={400}
                                    width={600}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
