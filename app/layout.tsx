import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";

import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GitExplorer — Discover GitHub Repositories & Developers",
    template: "%s · GitExplorer",
  },
  description:
    "Search and explore GitHub repositories and developers with a fast, modern interface powered by the GitHub REST API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "min-h-screen flex flex-col font-sans antialiased"
        )}
      >
        <Providers>
          <Navbar />
          <main className="flex-1 pt-14">{children}</main>
          
        </Providers>
      </body>
    </html>
  );
}
