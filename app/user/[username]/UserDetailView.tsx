"use client";

// ============================================================
// UserDetailView — Full user/organization profile page content
// ============================================================

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Building2,
  LinkIcon,
  Mail,
  Calendar,
  BookMarked,
  Users as UsersIcon,
} from "lucide-react";
import { useUserDetail, useUserRepos } from "@/features/user/useUser";
import { RepoCard } from "@/components/cards/RepoCard";
import { RepoDetailSkeleton, SearchGridSkeleton } from "@/components/common/SkeletonCard";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { fadeIn, slideUp, staggerContainer, staggerGrid } from "@/lib/animations";
import { formatNumber, formatDate, displayUrl } from "@/utils/formatters";
import { ROUTES } from "@/constants/routes";

interface UserDetailViewProps {
  username: string;
}

export function UserDetailView({ username }: UserDetailViewProps) {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserDetail(username);
  const { data: repos, isLoading: isReposLoading } = useUserRepos(username);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <RepoDetailSkeleton />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ErrorState error={error ?? undefined} onRetry={() => refetch()} />
      </div>
    );
  }

  const isOrg = user.type === "Organization";

  const stats = [
    { icon: BookMarked, label: "Repositories", value: formatNumber(user.public_repos) },
    { icon: UsersIcon, label: "Followers", value: formatNumber(user.followers) },
    { icon: UsersIcon, label: "Following", value: formatNumber(user.following) },
    { icon: BookMarked, label: "Gists", value: formatNumber(user.public_gists) },
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

      {/* Profile header */}
      <motion.div
        variants={slideUp}
        className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left"
      >
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border">
          <Image
            src={user.avatar_url}
            alt={user.login}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {user.name || user.login}
            </h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Open on GitHub"
              title="Open on GitHub"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">@{user.login}</p>

          {user.bio && (
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/90">
              {user.bio}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground sm:justify-start">
            {user.company && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {user.company}
              </span>
            )}
            {user.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {user.location}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                {displayUrl(user.blog)}
              </a>
            )}
            {user.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Joined {formatDate(user.created_at)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

      {/* Repositories */}
      <motion.div variants={fadeIn} className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">
          {isOrg ? "Organization Repositories" : "Recent Repositories"}
        </h2>

        {isReposLoading ? (
          <SearchGridSkeleton count={6} type="repo" />
        ) : !repos || repos.length === 0 ? (
          <EmptyState
            title="No public repositories"
            description={`${user.login} hasn't published any public repositories yet.`}
          />
        ) : (
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
