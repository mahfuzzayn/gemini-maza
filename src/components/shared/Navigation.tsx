"use client";

import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-background border-b-4 border-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center border-4 border-black bg-primary">
                            <Brain className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-black">
                            Gemini by <span className="text-primary">Morlabs</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:gap-4">
                        <Link
                            href="#home"
                            className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="#features"
                            className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="#ask"
                            className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                        >
                            Ask Gemini
                        </Link>
                        <Link
                            href="#testimonials"
                            className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="#pricing"
                            className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                        >
                            Pricing
                        </Link>
                        <Button asChild className="neobrutalism-button bg-primary text-primary-foreground font-black">
                            <a href="#ask">Get Started</a>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden border-2 border-black"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="border-t-4 border-black md:hidden bg-background">
                        <div className="flex flex-col gap-2 px-4 py-4">
                            <Link
                                href="#home"
                                className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="#features"
                                className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#ask"
                                className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Ask Gemini
                            </Link>
                            <Link
                                href="#testimonials"
                                className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Testimonials
                            </Link>
                            <Link
                                href="#pricing"
                                className="px-4 py-2 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Button asChild className="w-full neobrutalism-button bg-primary text-primary-foreground font-black mt-2">
                                <a href="#ask" onClick={() => setIsMobileMenuOpen(false)}>
                                    Get Started
                                </a>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
