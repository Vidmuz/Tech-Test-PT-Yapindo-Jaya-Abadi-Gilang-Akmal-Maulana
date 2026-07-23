"use client";

// ============================================================
// ErrorState — Friendly error cards with retry support
// ============================================================

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, WifiOff, Lock, FileQuestion } from "lucide-react";
import { slideUp } from "@/lib/animations";

interface ErrorStateProps {
  error?: Error & { response?: { status?: number }; userMessage?: string };
  onRetry?: () => void;
  title?: string;
}

function getErrorDetails(error?: ErrorStateProps["error"]) {
  const status = error?.response?.status;

  if (status === 403) {
    return {
      icon: Lock,
      title: "Rate Limit Exceeded",
      description:
        "You've hit the GitHub API rate limit. Please wait a moment before trying again. Consider adding a GitHub token to increase limits.",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    };
  }

  if (status === 404) {
    return {
      icon: FileQuestion,
      title: "Not Found",
      description: "The resource you're looking for doesn't exist or may have been removed.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    };
  }

  if (!navigator?.onLine || error?.message === "Network Error") {
    return {
      icon: WifiOff,
      title: "No Internet Connection",
      description: "Please check your internet connection and try again.",
      color: "text-gray-500",
      bg: "bg-gray-500/10",
    };
  }

  return {
    icon: AlertTriangle,
    title: "Something Went Wrong",
    description:
      error?.userMessage ||
      error?.message ||
      "An unexpected error occurred. Please try again.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  };
}

export function ErrorState({ error, onRetry, title }: ErrorStateProps) {
  const details = getErrorDetails(error);
  const Icon = details.icon;

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${details.bg} mb-5`}>
        <Icon className={`h-9 w-9 ${details.color}`} />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title || details.title}
      </h3>
      <p className="text-muted-foreground max-w-sm text-sm leading-relaxed mb-6">
        {details.description}
      </p>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
}
