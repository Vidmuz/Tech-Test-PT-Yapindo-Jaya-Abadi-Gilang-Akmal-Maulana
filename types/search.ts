// ============================================================
// Search & Filter Types
// ============================================================

export type SearchType = "repositories" | "users";

export type RepoSortOption = "best-match" | "stars" | "forks" | "updated";
export type UserSortOption = "best-match" | "followers" | "repositories" | "joined";
export type OrderOption = "desc" | "asc";

export type LanguageFilter =
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Go"
  | "Java"
  | "PHP"
  | "Rust"
  | "C#"
  | "C++"
  | "Kotlin"
  | "Swift"
  | "Ruby"
  | "Dart"
  | "Shell"
  | "Vue"
  | "";

export interface RepoSearchFilters {
  sort: RepoSortOption;
  order: OrderOption;
  language: LanguageFilter;
}

export interface UserSearchFilters {
  sort: UserSortOption;
  order: OrderOption;
}

export interface SearchParams {
  q: string;
  type: SearchType;
  sort?: string;
  order?: OrderOption;
  language?: LanguageFilter;
  page?: number;
  per_page?: number;
}

export interface InfinitePageParam {
  page: number;
}
