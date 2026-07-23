// ============================================================
// Application Routes
// ============================================================

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  REPOSITORY: (owner: string, repo: string) => `/repository/${owner}/${repo}`,
  USER: (username: string) => `/user/${username}`,
} as const;
