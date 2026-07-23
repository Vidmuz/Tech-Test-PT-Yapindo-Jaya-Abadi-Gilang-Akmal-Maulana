"use client";

// ============================================================
// EmptyState — Displayed when search returns no results
// ============================================================

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { slideUp } from "@/lib/animations";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = "No results found",
  description = "We couldn't find anything matching your search. Try adjusting your query or filters.",
  onReset,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-muted">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary/10 border-2 border-background" />
        <div className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-secondary border-2 border-background" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm text-sm leading-relaxed mb-6">
        {description}
      </p>

      {onReset && (
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Try another keyword
        </motion.button>
      )}
    </motion.div>
  );
}
