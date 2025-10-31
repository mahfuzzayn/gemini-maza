import React from "react";
import { Zap, Shield, Globe, Brain, Rocket, Infinity } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Get instant responses powered by Gemini 2.5 Flash model",
        },
        {
            icon: Brain,
            title: "AI Powered",
            description: "Advanced AI technology for accurate and intelligent answers",
        },
        {
            icon: Shield,
            title: "Secure & Safe",
            description: "Your questions and data are protected with enterprise security",
        },
        {
            icon: Globe,
            title: "24/7 Available",
            description: "Access Gemini by Morlabs anytime, anywhere, on any device",
        },
        {
            icon: Rocket,
            title: "Easy to Use",
            description: "Simple, intuitive interface that anyone can master in seconds",
        },
        {
            icon: Infinity,
            title: "Unlimited Questions",
            description: "Ask as many questions as you want without restrictions",
        },
    ];

    return (
        <section id="features" className="w-full py-12 sm:py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto font-semibold">
                            Everything you need to get the most out of AI-powered assistance
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="neobrutalism-card bg-white p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-transform"
                                >
                                    <div className="w-16 h-16 border-4 border-black bg-primary flex items-center justify-center mb-4">
                                        <Icon className="h-8 w-8 text-primary-foreground" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                                    <p className="text-foreground/80 font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
