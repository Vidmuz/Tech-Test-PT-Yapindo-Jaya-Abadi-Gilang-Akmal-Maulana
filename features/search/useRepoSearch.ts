// ============================================================
// useRepoSearch — Infinite query for repository search
// ============================================================

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchRepositories } from "@/services/github";
import type { GithubSearchRepoResult } from "@/types/github";
import type { RepoSortOption, OrderOption, LanguageFilter } from "@/types/search";
import { PER_PAGE } from "@/constants/filters";

interface UseRepoSearchParams {
  query: string;
  sort: RepoSortOption;
  order: OrderOption;
  language: LanguageFilter;
  enabled?: boolean;
}

export function useRepoSearch({ query, sort, order, language, enabled = true }: UseRepoSearchParams) {
  return useInfiniteQuery<GithubSearchRepoResult, Error>({
    queryKey: ["repos", query, sort, order, language],
    queryFn: ({ pageParam, signal }) =>
      searchRepositories({
        query,
        sort,
        order,
        language,
        page: pageParam as number,
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = allPages.reduce((sum, p) => sum + p.items.length, 0);
      const hasMore = fetchedCount < lastPage.total_count && lastPage.items.length === PER_PAGE;
      return hasMore ? allPages.length + 1 : undefined;
    },
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
