"use client";

// ============================================================
// SearchBar — Main search input with animated focus ring
// ============================================================

import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search repositories, users…",
  isLoading = false,
  size = "md",
  className,
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed && onSubmit) {
      onSubmit(trimmed);
    }
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const sizeClasses = {
    sm: "h-9 text-sm pl-9 pr-9",
    md: "h-11 text-sm pl-10 pr-10",
    lg: "h-14 text-base pl-12 pr-12",
  };

  const iconSizeClasses = {
    sm: "h-3.5 w-3.5 left-2.5",
    md: "h-4 w-4 left-3",
    lg: "h-5 w-5 left-4",
  };

  const rightIconClasses = {
    sm: "right-2.5",
    md: "right-3",
    lg: "right-4",
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)} role="search">
      {/* Left icon */}
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors",
          iconSizeClasses[size]
        )}
      >
        {isLoading ? (
          <Loader2 className="h-full w-full animate-spin" />
        ) : (
          <Search className="h-full w-full" />
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        id="main-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        className={cn(
          "w-full rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[size]
        )}
        aria-label="Search"
      />

      {/* Right: clear button */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 flex items-center",
          rightIconClasses[size]
        )}
      >
        <AnimatePresence>
          {value && (
            <motion.button
              type="button"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center rounded-md p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
