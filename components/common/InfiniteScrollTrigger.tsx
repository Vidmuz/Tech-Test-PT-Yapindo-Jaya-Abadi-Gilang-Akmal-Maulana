"use client";

// ============================================================
// InfiniteScrollTrigger — Invisible sentinel for infinite scroll
// ============================================================

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  isFetching: boolean;
  hasNextPage: boolean;
}

export function InfiniteScrollTrigger({
  onIntersect,
  isFetching,
  hasNextPage,
}: InfiniteScrollTriggerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetching,
    rootMargin: "0px 0px 300px 0px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      onIntersect();
    }
  }, [isIntersecting, hasNextPage, isFetching, onIntersect]);

  return (
    <div ref={ref} className="flex items-center justify-center py-8" aria-live="polite">
      {isFetching && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading more…</span>
        </motion.div>
      )}
      {!hasNextPage && !isFetching && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground"
        >
          You&apos;ve reached the end
        </motion.p>
      )}
    </div>
  );
}
