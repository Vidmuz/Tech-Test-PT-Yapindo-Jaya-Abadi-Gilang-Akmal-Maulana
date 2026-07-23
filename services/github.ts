// ============================================================
// GitHub API Service Layer
// All API calls go through this module. Uses Axios + AbortSignal.
// ============================================================

import githubApi from "@/lib/axios";
import { PER_PAGE } from "@/constants/filters";
import type {
  GithubRepo,
  GithubUser,
  GithubUserDetail,
  GithubSearchRepoResult,
  GithubSearchUserResult,
  GithubLanguages,
  GithubContributor,
  GithubReadme,
} from "@/types/github";
import type { RepoSortOption, UserSortOption, OrderOption, LanguageFilter } from "@/types/search";

// ── Repository Search ────────────────────────────────────────

interface SearchReposParams {
  query: string;
  sort: RepoSortOption;
  order: OrderOption;
  language: LanguageFilter;
  page: number;
  signal?: AbortSignal;
}

export async function searchRepositories({
  query,
  sort,
  order,
  language,
  page,
  signal,
}: SearchReposParams): Promise<GithubSearchRepoResult> {
  const q = language ? `${query} language:${language}` : query;
  const sortParam = sort === "best-match" ? undefined : sort;

  const { data } = await githubApi.get<GithubSearchRepoResult>("/search/repositories", {
    params: {
      q,
      sort: sortParam,
      order,
      per_page: PER_PAGE,
      page,
    },
    signal,
  });

  return data;
}

// ── User Search ──────────────────────────────────────────────

interface SearchUsersParams {
  query: string;
  sort: UserSortOption;
  order: OrderOption;
  page: number;
  signal?: AbortSignal;
}

export async function searchUsers({
  query,
  sort,
  order,
  page,
  signal,
}: SearchUsersParams): Promise<GithubSearchUserResult> {
  const sortParam = sort === "best-match" ? undefined : sort;

  const { data } = await githubApi.get<GithubSearchUserResult>("/search/users", {
    params: {
      q: query,
      sort: sortParam,
      order,
      per_page: PER_PAGE,
      page,
    },
    signal,
  });

  return data;
}

// ── Repository Detail ────────────────────────────────────────

export async function getRepository(
  owner: string,
  repo: string,
  signal?: AbortSignal
): Promise<GithubRepo> {
  const { data } = await githubApi.get<GithubRepo>(`/repos/${owner}/${repo}`, { signal });
  return data;
}

// ── Repository Languages ─────────────────────────────────────

export async function getRepoLanguages(
  owner: string,
  repo: string,
  signal?: AbortSignal
): Promise<GithubLanguages> {
  const { data } = await githubApi.get<GithubLanguages>(`/repos/${owner}/${repo}/languages`, {
    signal,
  });
  return data;
}

// ── Repository Contributors ──────────────────────────────────

export async function getRepoContributors(
  owner: string,
  repo: string,
  signal?: AbortSignal
): Promise<GithubContributor[]> {
  const { data } = await githubApi.get<GithubContributor[]>(
    `/repos/${owner}/${repo}/contributors`,
    {
      params: { per_page: 12 },
      signal,
    }
  );
  return data;
}

// ── Repository README ────────────────────────────────────────

export async function getRepoReadme(
  owner: string,
  repo: string,
  signal?: AbortSignal
): Promise<string> {
  const { data } = await githubApi.get<GithubReadme>(`/repos/${owner}/${repo}/readme`, {
    signal,
  });
  // Content is Base64-encoded — decode it
  return atob(data.content.replace(/\n/g, ""));
}

// ── User Detail ──────────────────────────────────────────────

export async function getUserDetail(
  username: string,
  signal?: AbortSignal
): Promise<GithubUserDetail> {
  const { data } = await githubApi.get<GithubUserDetail>(`/users/${username}`, { signal });
  return data;
}

// ── User Repositories ────────────────────────────────────────

export async function getUserRepositories(
  username: string,
  signal?: AbortSignal
): Promise<GithubRepo[]> {
  const { data } = await githubApi.get<GithubRepo[]>(`/users/${username}/repos`, {
    params: {
      sort: "updated",
      per_page: 12,
      type: "owner",
    },
    signal,
  });
  return data;
}
