// ============================================================
// Search & Filter Constants
// ============================================================

import type { RepoSortOption, UserSortOption, OrderOption, LanguageFilter } from "@/types/search";

export const REPO_SORT_OPTIONS: { value: RepoSortOption; label: string }[] = [
  { value: "best-match", label: "Best Match" },
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "updated", label: "Updated" },
];

export const USER_SORT_OPTIONS: { value: UserSortOption; label: string }[] = [
  { value: "best-match", label: "Best Match" },
  { value: "followers", label: "Followers" },
  { value: "repositories", label: "Repositories" },
  { value: "joined", label: "Joined" },
];

export const ORDER_OPTIONS: { value: OrderOption; label: string }[] = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export const LANGUAGE_FILTERS: { value: LanguageFilter; label: string; color: string }[] = [
  { value: "", label: "All Languages", color: "#8b949e" },
  { value: "JavaScript", label: "JavaScript", color: "#f1e05a" },
  { value: "TypeScript", label: "TypeScript", color: "#3178c6" },
  { value: "Python", label: "Python", color: "#3572A5" },
  { value: "Go", label: "Go", color: "#00ADD8" },
  { value: "Java", label: "Java", color: "#b07219" },
  { value: "PHP", label: "PHP", color: "#4F5D95" },
  { value: "Rust", label: "Rust", color: "#dea584" },
  { value: "C#", label: "C#", color: "#178600" },
  { value: "C++", label: "C++", color: "#f34b7d" },
  { value: "Kotlin", label: "Kotlin", color: "#A97BFF" },
  { value: "Swift", label: "Swift", color: "#F05138" },
  { value: "Ruby", label: "Ruby", color: "#701516" },
  { value: "Dart", label: "Dart", color: "#00B4AB" },
  { value: "Shell", label: "Shell", color: "#89e051" },
  { value: "Vue", label: "Vue", color: "#41b883" },
];

export const PER_PAGE = 30;
