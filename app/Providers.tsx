"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-theme";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">{children}</ThemeProvider>
        </HeroUIProvider>
    );
}
