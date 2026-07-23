"use client";

// ============================================================
// SearchFilters — Sort, order, and language filter controls
// ============================================================

import { ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  REPO_SORT_OPTIONS,
  USER_SORT_OPTIONS,
  ORDER_OPTIONS,
  LANGUAGE_FILTERS,
} from "@/constants/filters";
import type {
  SearchType,
  RepoSortOption,
  UserSortOption,
  OrderOption,
  LanguageFilter,
} from "@/types/search";
import { getLanguageColor } from "@/utils/languages";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface SearchFiltersProps {
  searchType: SearchType;
  repoSort: RepoSortOption;
  userSort: UserSortOption;
  order: OrderOption;
  language: LanguageFilter;
  totalCount: number;
  onRepoSortChange: (sort: RepoSortOption) => void;
  onUserSortChange: (sort: UserSortOption) => void;
  onOrderChange: (order: OrderOption) => void;
  onLanguageChange: (lang: LanguageFilter) => void;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({ id, label, value, options, onChange }: SelectProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "appearance-none h-8 rounded-lg border border-border bg-background",
          "pl-3 pr-7 text-xs font-medium text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          "cursor-pointer hover:bg-accent transition-colors"
        )}
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
    </div>
  );
}

export function SearchFilters({
  searchType,
  repoSort,
  userSort,
  order,
  language,
  totalCount,
  onRepoSortChange,
  onUserSortChange,
  onOrderChange,
  onLanguageChange,
}: SearchFiltersProps) {
  const isRepos = searchType === "repositories";

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
    >
      {/* Result count */}
      <p className="text-sm text-muted-foreground shrink-0">
        <span className="font-semibold text-foreground">
          {totalCount.toLocaleString()}
        </span>{" "}
        {isRepos ? "repositories" : "users"} found
      </p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />

        {/* Sort */}
        {isRepos ? (
          <FilterSelect
            id="repo-sort"
            label="Sort repositories by"
            value={repoSort}
            options={REPO_SORT_OPTIONS}
            onChange={(v) => onRepoSortChange(v as RepoSortOption)}
          />
        ) : (
          <FilterSelect
            id="user-sort"
            label="Sort users by"
            value={userSort}
            options={USER_SORT_OPTIONS}
            onChange={(v) => onUserSortChange(v as UserSortOption)}
          />
        )}

        {/* Order */}
        <FilterSelect
          id="order"
          label="Order direction"
          value={order}
          options={ORDER_OPTIONS}
          onChange={(v) => onOrderChange(v as OrderOption)}
        />

        {/* Language filter — repos only */}
        {isRepos && (
          <div className="relative">
            <label htmlFor="language-filter" className="sr-only">
              Filter by language
            </label>
            <select
              id="language-filter"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageFilter)}
              className={cn(
                "appearance-none h-8 rounded-lg border border-border bg-background",
                "pl-3 pr-7 text-xs font-medium text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "cursor-pointer hover:bg-accent transition-colors"
              )}
              aria-label="Filter by programming language"
            >
              {LANGUAGE_FILTERS.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            {/* Language color dot */}
            {language && (
              <span
                className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
                style={{ backgroundColor: getLanguageColor(language) }}
              />
            )}
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
