import Gemini from "@/components/modules/home/Gemini";
import HeroSection from "@/components/modules/home/Hero";
import Features from "@/components/modules/home/Features";
import Testimonials from "@/components/modules/home/Testimonials";
import Pricing from "@/components/modules/home/Pricing";
import FAQ from "@/components/modules/home/FAQ";
import Footer from "@/components/shared/Footer";
import React from "react";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Features />
            <Gemini />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Footer />
        </>
    );
};

export default HomePage;
