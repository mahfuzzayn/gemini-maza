import Gemini from "@/components/modules/home/Gemini";
import HeroSection from "@/components/modules/home/Hero";
import { Separator } from "@/components/ui/separator";
import React from "react";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Separator className="my-10" />
            <Gemini />
        </>
    );
};

export default HomePage;
