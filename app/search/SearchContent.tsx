"use client";

// ============================================================
// SearchContent — Search results: tabs, filters, grid, pagination
// ============================================================

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SearchTabs } from "@/components/search/SearchTabs";
import { SearchFilters } from "@/components/search/SearchFilters";
import { RepoCard } from "@/components/cards/RepoCard";
import { UserCard } from "@/components/cards/UserCard";
import { SearchGridSkeleton } from "@/components/common/SkeletonCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { InfiniteScrollTrigger } from "@/components/common/InfiniteScrollTrigger";
import { useRepoSearch } from "@/features/search/useRepoSearch";
import { useUserSearch } from "@/features/search/useUserSearch";
import { staggerGrid } from "@/lib/animations";
import type {
  SearchType,
  RepoSortOption,
  UserSortOption,
  OrderOption,
  LanguageFilter,
} from "@/types/search";
import type { GithubRepo, GithubUser } from "@/types/github";

export function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get("q") ?? "";
  const type = (searchParams.get("type") as SearchType) || "repositories";
  const repoSort = (searchParams.get("sort") as RepoSortOption) || "best-match";
  const userSort = (searchParams.get("sort") as UserSortOption) || "best-match";
  const order = (searchParams.get("order") as OrderOption) || "desc";
  const language = (searchParams.get("language") as LanguageFilter) || "";

  const hasQuery = q.trim().length > 0;

  // Update one or more search params while preserving the rest
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const repoQuery = useRepoSearch({
    query: q,
    sort: repoSort,
    order,
    language,
    enabled: type === "repositories" && hasQuery,
  });

  const userQuery = useUserSearch({
    query: q,
    sort: userSort,
    order,
    enabled: type === "users" && hasQuery,
  });

  const {
    data: repoData,
    isLoading: isRepoLoading,
    isError: isRepoError,
    error: repoError,
    refetch: refetchRepo,
    fetchNextPage: fetchNextRepoPage,
    hasNextPage: repoHasNextPage,
    isFetchingNextPage: isFetchingNextRepoPage,
  } = repoQuery;

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch: refetchUser,
    fetchNextPage: fetchNextUserPage,
    hasNextPage: userHasNextPage,
    isFetchingNextPage: isFetchingNextUserPage,
  } = userQuery;

  const isRepoType = type === "repositories";
  const isLoading = isRepoType ? isRepoLoading : isUserLoading;
  const isError = isRepoType ? isRepoError : isUserError;
  const error = isRepoType ? repoError : userError;
  const refetch = isRepoType ? refetchRepo : refetchUser;
  const fetchNextPage = isRepoType ? fetchNextRepoPage : fetchNextUserPage;
  const hasNextPage = isRepoType ? repoHasNextPage : userHasNextPage;
  const isFetchingNextPage = isRepoType ? isFetchingNextRepoPage : isFetchingNextUserPage;

  const repoItems = useMemo(
    () => repoData?.pages.flatMap((page) => page.items as GithubRepo[]) ?? [],
    [repoData]
  );

  const userItems = useMemo(
    () => userData?.pages.flatMap((page) => page.items as GithubUser[]) ?? [],
    [userData]
  );

  const items = isRepoType ? repoItems : userItems;
  const totalCount = isRepoType
    ? repoData?.pages[0]?.total_count ?? 0
    : userData?.pages[0]?.total_count ?? 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <SearchTabs
        value={type}
        onChange={(newType) => updateParams({ type: newType, sort: null })}
      />

      {!hasQuery ? (
        <EmptyState
          title="Start exploring GitHub"
          description="Type a keyword in the search bar above to find repositories or users."
        />
      ) : isLoading ? (
        <SearchGridSkeleton type={type === "repositories" ? "repo" : "user"} />
      ) : isError ? (
        <ErrorState error={error ?? undefined} onRetry={() => refetch()} />
      ) : items.length === 0 ? (
        <EmptyState onReset={() => updateParams({ q: null })} />
      ) : (
        <>
          <SearchFilters
            searchType={type}
            repoSort={repoSort}
            userSort={userSort}
            order={order}
            language={language}
            totalCount={totalCount}
            onRepoSortChange={(sort) => updateParams({ sort })}
            onUserSortChange={(sort) => updateParams({ sort })}
            onOrderChange={(newOrder) => updateParams({ order: newOrder })}
            onLanguageChange={(lang) => updateParams({ language: lang })}
          />

          <motion.div
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {isRepoType
              ? repoItems.map((repo) => <RepoCard key={repo.id} repo={repo} />)
              : userItems.map((user) => <UserCard key={user.id} user={user} />)}
          </motion.div>

          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            isFetching={isFetchingNextPage}
            hasNextPage={!!hasNextPage}
          />
        </>
      )}
    </div>
  );
}
