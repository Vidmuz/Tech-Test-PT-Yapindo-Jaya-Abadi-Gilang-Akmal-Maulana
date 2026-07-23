"use client";

// ============================================================
// Navbar — Sticky top navigation bar
// ============================================================

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Github, Search } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";
import { useState, useEffect, Suspense } from "react";

function NavbarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Track scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync search input with URL on search page
  useEffect(() => {
    if (!isHome) {
      setSearchValue(searchParams.get("q") ?? "");
    }
  }, [searchParams, isHome]);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    const type = searchParams.get("type") ?? "repositories";
    router.push(`/search?q=${encodeURIComponent(trimmed)}&type=${type}`);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "glass border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80 transition-opacity shrink-0"
          aria-label="GitHub Explorer Home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
            <Github className="h-4 w-4" />
          </div>
          <span className="hidden sm:block text-sm font-semibold tracking-tight">
            GitExplorer
          </span>
        </Link>

        {/* Inline search — hidden on landing page */}
        {!isHome && (
          <form
            onSubmit={handleNavSearch}
            className="flex flex-1 max-w-md"
            role="search"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                id="navbar-search"
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search repositories or users…"
                className="w-full h-8 rounded-lg border border-border bg-background/80 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                aria-label="Search repositories or users"
              />
            </div>
          </form>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Visit GitHub"
            title="Visit GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
