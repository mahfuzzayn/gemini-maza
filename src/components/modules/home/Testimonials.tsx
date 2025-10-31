import React from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sophie Laurent",
            role: "Software Engineer",
            location: "Paris, France",
            content: "Gemini by Morlabs has revolutionized my workflow! The responses are incredibly fast and accurate. Perfect for coding assistance and technical questions.",
            rating: 5,
        },
        {
            name: "James Mitchell",
            role: "Content Writer",
            location: "New York, USA",
            content: "As a content creator, I rely on Gemini by Morlabs daily. It helps me brainstorm ideas, refine my writing, and answer research questions instantly. Brilliant tool!",
            rating: 5,
        },
        {
            name: "Emma Schmidt",
            role: "Data Scientist",
            location: "Berlin, Germany",
            content: "The AI's understanding of complex topics is impressive. I use it for explaining statistical concepts and it never disappoints. Highly recommended!",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Product Manager",
            location: "San Francisco, USA",
            content: "Game changer for my workflow. Fast, reliable, and the neobrutalism design is absolutely stunning! Best AI assistant I've used.",
            rating: 5,
        },
        {
            name: "Luca Rossi",
            role: "Marketing Director",
            location: "Milan, Italy",
            content: "Gemini by Morlabs helps me create marketing content and analyze market trends. The accuracy and speed are outstanding. Love the bold design!",
            rating: 5,
        },
        {
            name: "Sarah Johnson",
            role: "University Student",
            location: "London, UK",
            content: "Perfect for studying! It explains complex concepts in simple terms and helps with my research. The free tier is generous too!",
            rating: 5,
        },
        {
            name: "David Thompson",
            role: "Full Stack Developer",
            location: "Austin, USA",
            content: "I use Gemini by Morlabs for debugging help and code reviews. It's like having a senior developer available 24/7. Absolutely fantastic!",
            rating: 5,
        },
        {
            name: "Anna Kowalska",
            role: "UX Designer",
            location: "Warsaw, Poland",
            content: "The AI helps me understand user behavior and provides design insights. The interface is intuitive and the responses are always helpful.",
            rating: 5,
        },
    ];

    return (
        <section id="testimonials" className="w-full py-12 sm:py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                            What Users Say
                        </h2>
                        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto font-semibold">
                            Join thousands of satisfied users from around the world who trust Gemini by Morlabs
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="neobrutalism-card bg-white p-6 sm:p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-transform"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-primary text-primary border-2 border-black"
                                        />
                                    ))}
                                </div>
                                <p className="text-foreground/90 mb-6 font-medium text-base leading-relaxed">
                                    "{testimonial.content}"
                                </p>
                                <div className="border-t-4 border-black pt-4">
                                    <p className="font-black text-lg">{testimonial.name}</p>
                                    <p className="text-foreground/70 font-semibold text-sm">
                                        {testimonial.role}
                                    </p>
                                    <p className="text-foreground/60 font-medium text-xs mt-1">
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;