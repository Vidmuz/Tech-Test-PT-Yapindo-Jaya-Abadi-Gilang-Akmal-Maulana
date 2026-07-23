"use client";

// ============================================================
// Home — Landing page with hero search
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, GitFork, Users as UsersIcon, TrendingUp } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchTabs } from "@/components/search/SearchTabs";
import { heroEntrance, fadeIn, float } from "@/lib/animations";
import type { SearchType } from "@/types/search";
import { ROUTES } from "@/constants/routes";

const QUICK_SEARCHES = [
  "react",
  "nextjs",
  "tensorflow",
  "vscode",
  "kubernetes",
  "tailwindcss",
];

const STATS = [
  { icon: Star, label: "Repositories indexed", value: "200M+" },
  { icon: UsersIcon, label: "Developers", value: "100M+" },
  { icon: GitFork, label: "Organizations", value: "4M+" },
  { icon: TrendingUp, label: "Live GitHub data", value: "Real-time" },
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("repositories");

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmed)}&type=${searchType}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          variants={float}
          initial="initial"
          animate="animate"
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          variants={float}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.5 }}
          className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-secondary/40 blur-3xl"
        />
      </div>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
         

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Repository Explorer
            <br />
            <span className="gradient-text">MADE BY GILANG AKMAL MAULANA</span>
          </h1>

          <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-10 flex w-full max-w-2xl flex-col items-center gap-4"
        >
          <SearchTabs value={searchType} onChange={setSearchType} />

          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            size="lg"
            autoFocus
            placeholder={
              searchType === "repositories"
                ? "Search repositories… e.g. \"react\" or \"machine learning\""
                : "Search users or organizations… e.g. \"torvalds\""
            }
          />

          {/* Quick search chips */}
         
        </motion.div>
      </section>
      
    </div>
  );
}
