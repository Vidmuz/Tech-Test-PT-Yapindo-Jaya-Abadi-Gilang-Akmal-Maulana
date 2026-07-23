// ============================================================
// TanStack Query Client Configuration
// ============================================================

import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache data for 5 minutes before considering it stale
        staleTime: 5 * 60 * 1000,
        // Keep data in cache for 30 minutes after no active subscribers
        gcTime: 30 * 60 * 1000,
        // Only retry once on failure (respect rate limits)
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
        // Refetch on window focus only when data is stale
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
    },
  });
}

// Browser singleton — avoids creating a new client on every render
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always create a new client
    return makeQueryClient();
  }
  // Browser: reuse the same client
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
