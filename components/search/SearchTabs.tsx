"use client";

// ============================================================
// SearchTabs — Segmented control for Repositories / Users
// ============================================================

import { motion } from "framer-motion";
import { BookMarked, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchType } from "@/types/search";

interface SearchTabsProps {
  value: SearchType;
  onChange: (value: SearchType) => void;
}

const TABS: { value: SearchType; label: string; icon: React.ElementType }[] = [
  { value: "repositories", label: "Repositories", icon: BookMarked },
  { value: "users", label: "Users", icon: Users },
];

export function SearchTabs({ value, onChange }: SearchTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Search type"
      className="flex items-center gap-1 rounded-lg bg-muted p-1 w-fit"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = value === tab.value;

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            id={`tab-${tab.value}`}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {/* Active pill background */}
            {isActive && (
              <motion.div
                layoutId="search-tab-pill"
                className="absolute inset-0 rounded-md bg-background shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
