// ============================================================
// Repository Feature Hooks
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  getRepository,
  getRepoLanguages,
  getRepoContributors,
  getRepoReadme,
} from "@/services/github";

/** Fetch full repository details */
export function useRepoDetail(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repo", owner, repo],
    queryFn: ({ signal }) => getRepository(owner, repo, signal),
    enabled: !!owner && !!repo,
    staleTime: 5 * 60 * 1000,
  });
}

/** Fetch repository language breakdown */
export function useRepoLanguages(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repo-languages", owner, repo],
    queryFn: ({ signal }) => getRepoLanguages(owner, repo, signal),
    enabled: !!owner && !!repo,
    staleTime: 30 * 60 * 1000,
  });
}

/** Fetch top contributors */
export function useRepoContributors(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repo-contributors", owner, repo],
    queryFn: ({ signal }) => getRepoContributors(owner, repo, signal),
    enabled: !!owner && !!repo,
    staleTime: 30 * 60 * 1000,
  });
}

/** Fetch and decode README content */
export function useRepoReadme(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repo-readme", owner, repo],
    queryFn: ({ signal }) => getRepoReadme(owner, repo, signal),
    enabled: !!owner && !!repo,
    staleTime: 30 * 60 * 1000,
    // README not found is fine — not a hard error
    retry: false,
  });
}
