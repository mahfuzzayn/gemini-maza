import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "Forever",
            description: "Perfect for trying out Gemini by Morlabs",
            features: [
                "10 questions per day",
                "Standard response time",
                "Community support",
                "Basic AI features",
            ],
            cta: "Get Started",
            popular: false,
            borderColor: "border-black",
        },
        {
            name: "Pro",
            price: "$9",
            period: "per month",
            description: "For professionals and power users",
            features: [
                "Unlimited questions",
                "Priority response time",
                "Advanced AI features",
                "Email support",
                "API access",
                "Custom integrations",
            ],
            cta: "Go Pro",
            popular: true,
            borderColor: "border-primary",
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "per month",
            description: "For teams and organizations",
            features: [
                "Everything in Pro",
                "Dedicated support",
                "SLA guarantee",
                "Custom training",
                "Team management",
                "Advanced analytics",
            ],
            cta: "Contact Sales",
            popular: false,
            borderColor: "border-black",
        },
    ];

    return (
        <section id="pricing" className="w-full py-12 sm:py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                            Simple Pricing
                        </h2>
                        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto font-semibold">
                            Choose the perfect plan for your needs
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`neobrutalism-card bg-white p-6 sm:p-8 relative ${
                                    plan.popular
                                        ? "border-6 border-primary scale-105 sm:scale-110"
                                        : ""
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 border-4 border-black bg-primary px-4 py-1 font-black text-primary-foreground">
                                        POPULAR
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-4xl font-black">{plan.price}</span>
                                        {plan.price !== "Custom" && (
                                            <span className="text-foreground/70 font-semibold">
                                                /{plan.period}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-foreground/80 font-medium">
                                        {plan.description}
                                    </p>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="flex items-start gap-2"
                                        >
                                            <div className="w-5 h-5 border-2 border-black bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="h-3 w-3 text-primary-foreground" />
                                            </div>
                                            <span className="font-semibold">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    asChild
                                    className={`w-full neobrutalism-button font-black ${
                                        plan.popular
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-white text-black border-4 border-black hover:bg-black hover:text-white"
                                    }`}
                                    size="lg"
                                >
                                    <a href="#ask">{plan.cta}</a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
