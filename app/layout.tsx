import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const funDisplay = Funnel_Display({
    variable: "--font-funnel-display",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Open Cinemas",
    description: "Free movies for everyone | Open Cinemas ",
    viewport: "width=device-width, initial-scale=1",
    keywords: [
        "movies",
        "free",
        "open",
        "cinemas",
        "open cinemas",
        "movies free",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <Analytics />
            <SpeedInsights />
            <body className={funDisplay.variable}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
