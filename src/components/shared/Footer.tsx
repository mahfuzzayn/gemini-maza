import React from "react";
import { Brain, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full border-t-4 border-black bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center border-4 border-black bg-primary">
                                <Brain className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-black">
                                Gemini by <span className="text-primary">Morlabs</span>
                            </span>
                        </Link>
                        <p className="text-foreground/80 font-semibold mb-4 max-w-md">
                            Experience the power of Google's Gemini AI. Get instant, intelligent
                            answers to your questions.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 border-2 border-black bg-primary flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5 text-primary-foreground" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 border-2 border-black bg-primary flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5 text-primary-foreground" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 border-2 border-black bg-primary flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5 text-primary-foreground" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-black text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#home"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#pricing"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#testimonials"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    Testimonials
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-black text-lg mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#faq"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t-4 border-black pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="font-semibold text-foreground/80">
                        © {new Date().getFullYear()} Gemini by Morlabs. All rights reserved.
                    </p>
                    <p className="font-semibold text-foreground/80">
                        Built with <span className="text-primary font-black">❤</span> by <a href="https://morlabs.co" target="_blank" className="text-primary font-black">Morlabs</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
