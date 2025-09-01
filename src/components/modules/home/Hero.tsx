import Image from "next/image";
import React from "react";
import bannerImg from "@/assets/images/gemini-banner.jpg";

const HeroSection = () => {
    return (
        <div className="hero-section mt-12">
            <div className="flex justify-center items-center gap-10 p-5">
                <Image
                    src={bannerImg}
                    alt="Gemini Banner Image"
                    height={288}
                    width={512}
                    className="object-cover bg-center"
                />
                <h1 className="text-5xl font-bold">
                    Gemini with <span className="text-[#3D8BF1]">MaZa</span>
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;
