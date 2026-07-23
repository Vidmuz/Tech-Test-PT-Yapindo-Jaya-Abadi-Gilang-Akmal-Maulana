"use client";

// ============================================================
// RepoCard — Repository search result card
// ============================================================

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  GitFork,
  AlertCircle,
  Clock,
  Eye,
  Scale,
  Lock,
  Globe,
} from "lucide-react";
import { cardItem } from "@/lib/animations";
import { formatNumber, formatRelativeTime } from "@/utils/formatters";
import { getLanguageColor } from "@/utils/languages";
import { cn } from "@/lib/utils";
import type { GithubRepo } from "@/types/github";
import { ROUTES } from "@/constants/routes";

interface RepoCardProps {
  repo: GithubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const langColor = getLanguageColor(repo.language);

  return (
    <motion.div variants={cardItem}>
      <Link
        href={ROUTES.REPOSITORY(repo.owner.login, repo.name)}
        className="group block"
        aria-label={`View repository ${repo.full_name}`}
      >
        <article className="relative h-full rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
          {/* Header row */}
          <div className="flex items-start gap-3 mb-3">
            {/* Owner avatar */}
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>

            {/* Name & owner */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {repo.name}
              </h3>
              <p className="truncate text-xs text-muted-foreground">
                {repo.owner.login}
              </p>
            </div>

            {/* Visibility badge */}
            <span
              className={cn(
                "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                repo.visibility === "public"
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
              )}
            >
              {repo.visibility === "public" ? (
                <Globe className="h-2.5 w-2.5" />
              ) : (
                <Lock className="h-2.5 w-2.5" />
              )}
              {repo.visibility}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed min-h-[2.5rem]">
            {repo.description || "No description provided."}
          </p>

          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {repo.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium"
                >
                  {topic}
                </span>
              ))}
              {repo.topics.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{repo.topics.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Bottom stats */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-auto pt-3 border-t border-border/50">
            {/* Language */}
            {repo.language && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                {repo.language}
              </span>
            )}

            {/* Stars */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3" />
              {formatNumber(repo.stargazers_count)}
            </span>

            {/* Forks */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <GitFork className="h-3 w-3" />
              {formatNumber(repo.forks_count)}
            </span>

            {/* Issues */}
            {repo.open_issues_count > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                {formatNumber(repo.open_issues_count)}
              </span>
            )}

            {/* License */}
            {repo.license && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Scale className="h-3 w-3" />
                {repo.license.spdx_id}
              </span>
            )}

            {/* Updated */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(repo.updated_at)}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
