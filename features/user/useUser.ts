// ============================================================
// User Feature Hooks
// ============================================================

import { useQuery } from "@tanstack/react-query";
import { getUserDetail, getUserRepositories } from "@/services/github";

/** Fetch full user/organization profile */
export function useUserDetail(username: string) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: ({ signal }) => getUserDetail(username, signal),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
}

/** Fetch user's recent repositories */
export function useUserRepos(username: string) {
  return useQuery({
    queryKey: ["user-repos", username],
    queryFn: ({ signal }) => getUserRepositories(username, signal),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
}
