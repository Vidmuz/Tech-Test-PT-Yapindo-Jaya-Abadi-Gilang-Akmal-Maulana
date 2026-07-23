// ============================================================
// GitHub API Response Types
// ============================================================

export interface GithubOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: "User" | "Organization";
}

export interface GithubLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: GithubOwner;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  license: GithubLicense | null;
  visibility: "public" | "private" | "internal";
  default_branch: string;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  clone_url: string;
  ssh_url: string;
  git_url: string;
  watchers: number;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  archived: boolean;
  disabled: boolean;
  network_count?: number;
  subscribers_count?: number;
}

export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  gravatar_id: string;
  html_url: string;
  type: "User" | "Organization";
  score: number;
  followers_url?: string;
  repos_url?: string;
}

export interface GithubUserDetail {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  type: "User" | "Organization";
  site_admin: boolean;
}

export interface GithubSearchRepoResult {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepo[];
}

export interface GithubSearchUserResult {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export interface GithubLanguages {
  [language: string]: number;
}

export interface GithubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export interface GithubReadme {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}
