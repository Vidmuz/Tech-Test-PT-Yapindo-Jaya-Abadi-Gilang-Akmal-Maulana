"use client";

// ============================================================
// RepoDetailView — Full repository detail page content
// ============================================================

import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  GitFork,
  Eye,
  AlertCircle,
  Scale,
  Calendar,
  RefreshCw,
  ExternalLink,
  Link as LinkIcon,
  Lock,
  Globe,
  Archive,
  FileWarning,
} from "lucide-react";
import {
  useRepoDetail,
  useRepoLanguages,
  useRepoContributors,
  useRepoReadme,
} from "@/features/repository/useRepository";
import { RepoDetailSkeleton } from "@/components/common/SkeletonCard";
import { ErrorState } from "@/components/common/ErrorState";
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  formatNumber,
  formatDate,
  formatRelativeTime,
  formatRepoSize,
  displayUrl,
} from "@/utils/formatters";
import { calculateLanguagePercentages } from "@/utils/languages";
import { ROUTES } from "@/constants/routes";

interface RepoDetailViewProps {
  owner: string;
  repo: string;
}

export function RepoDetailView({ owner, repo }: RepoDetailViewProps) {
  const {
    data: repoData,
    isLoading,
    isError,
    error,
    refetch,
  } = useRepoDetail(owner, repo);
  const { data: languages } = useRepoLanguages(owner, repo);
  const { data: contributors } = useRepoContributors(owner, repo);
  const { data: readme, isLoading: isReadmeLoading, isError: isReadmeError } = useRepoReadme(
    owner,
    repo
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <RepoDetailSkeleton />
      </div>
    );
  }

  if (isError || !repoData) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ErrorState error={error as any} onRetry={() => refetch()} />
      </div>
    );
  }

  const languageStats = languages ? calculateLanguagePercentages(languages) : [];

  const stats = [
    { icon: Star, label: "Stars", value: formatNumber(repoData.stargazers_count) },
    { icon: GitFork, label: "Forks", value: formatNumber(repoData.forks_count) },
    { icon: Eye, label: "Watchers", value: formatNumber(repoData.watchers_count) },
    {
      icon: AlertCircle,
      label: "Open Issues",
      value: formatNumber(repoData.open_issues_count),
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Back link */}
      <motion.div variants={fadeIn}>
        <Link
          href={ROUTES.SEARCH}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to search
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={slideUp} className="space-y-4">
        <div className="flex flex-wrap items-start gap-4">
          <Link href={ROUTES.USER(repoData.owner.login)} className="shrink-0">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-border">
              <Image
                src={repoData.owner.avatar_url}
                alt={repoData.owner.login}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                <Link
                  href={ROUTES.USER(repoData.owner.login)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {repoData.owner.login}
                </Link>
                <span className="text-muted-foreground/50 mx-1">/</span>
                {repoData.name}
              </h1>
              <a
                href={repoData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Open on GitHub"
                title="Open on GitHub"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  repoData.visibility === "public"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                )}
              >
                {repoData.visibility === "public" ? (
                  <Globe className="h-2.5 w-2.5" />
                ) : (
                  <Lock className="h-2.5 w-2.5" />
                )}
                {repoData.visibility}
              </span>
              {repoData.fork && (
                <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  <GitFork className="h-2.5 w-2.5" />
                  Fork
                </span>
              )}
              {repoData.archived && (
                <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                  <Archive className="h-2.5 w-2.5" />
                  Archived
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {repoData.description || "No description provided."}
        </p>

        {repoData.topics && repoData.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repoData.topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Stats grid */}
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
            <span className="text-xl font-bold text-foreground">{value}</span>
          </div>
        ))}
      </motion.div>

      {/* Language bar */}
      {languageStats.length > 0 && (
        <motion.div variants={fadeIn} className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">Languages</h2>
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
            {languageStats.map(({ language, percentage, color }) => (
              <div
                key={language}
                style={{ width: `${percentage}%`, backgroundColor: color }}
                title={`${language}: ${percentage}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {languageStats.map(({ language, percentage, color }) => (
              <span
                key={language}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {language}
                <span className="text-muted-foreground/70">{percentage}%</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Meta info */}
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-4 text-sm sm:grid-cols-2 lg:grid-cols-3"
      >
        {repoData.license && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Scale className="h-4 w-4 shrink-0" />
            <span>{repoData.license.name}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>Created {formatDate(repoData.created_at)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4 shrink-0" />
          <span>Updated {formatRelativeTime(repoData.updated_at)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Eye className="h-4 w-4 shrink-0" />
          <span>{formatRepoSize(repoData.size)} on disk</span>
        </div>
        {repoData.homepage && (
          <a
            href={repoData.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <LinkIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">{displayUrl(repoData.homepage)}</span>
          </a>
        )}
      </motion.div>

      {/* Contributors */}
      {contributors && contributors.length > 0 && (
        <motion.div variants={fadeIn} className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">
            Top Contributors
          </h2>
          <div className="flex flex-wrap gap-3">
            {contributors.map((c) => (
              <Link
                key={c.id}
                href={ROUTES.USER(c.login)}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40"
                title={`${c.login} — ${formatNumber(c.contributions)} contributions`}
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={c.avatar_url}
                    alt={c.login}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="max-w-[5rem] truncate text-xs font-medium text-foreground group-hover:text-primary">
                  {c.login}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {formatNumber(c.contributions)}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* README */}
      <motion.div variants={fadeIn} className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">README</h2>
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          {isReadmeLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-2/3 rounded shimmer" />
              <div className="h-4 w-full rounded shimmer" />
              <div className="h-4 w-5/6 rounded shimmer" />
            </div>
          ) : isReadmeError || !readme ? (
            <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
              <FileWarning className="h-4 w-4" />
              No README available for this repository.
            </div>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {readme}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
