// ============================================================
// useUserSearch — Infinite query for user search
// ============================================================

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchUsers } from "@/services/github";
import type { GithubSearchUserResult } from "@/types/github";
import type { UserSortOption, OrderOption } from "@/types/search";
import { PER_PAGE } from "@/constants/filters";

interface UseUserSearchParams {
  query: string;
  sort: UserSortOption;
  order: OrderOption;
  enabled?: boolean;
}

export function useUserSearch({ query, sort, order, enabled = true }: UseUserSearchParams) {
  return useInfiniteQuery<GithubSearchUserResult, Error>({
    queryKey: ["users", query, sort, order],
    queryFn: ({ pageParam, signal }) =>
      searchUsers({
        query,
        sort,
        order,
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
