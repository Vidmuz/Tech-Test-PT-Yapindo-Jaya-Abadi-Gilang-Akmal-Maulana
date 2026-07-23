"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/common/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4">
      <ErrorState error={error} onRetry={reset} title="Something broke" />
    </div>
  );
}
