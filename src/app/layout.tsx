import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/shared/Navigation";
import { Toaster } from "sonner";

const interSans = Inter({
    variable: "--font-inter-sans",
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Gemini with Morlabs - AI-Powered Q&A",
    description: "Experience the power of Google's Gemini AI. Get instant, intelligent answers to your questions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${interSans.className} antialiased`}>
                <Navigation />
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
