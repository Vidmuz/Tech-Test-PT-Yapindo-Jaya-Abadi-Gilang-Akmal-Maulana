"use client";

// ============================================================
// UserCard — User/organization search result card
// ============================================================

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, User as UserIcon, ArrowUpRight } from "lucide-react";
import { cardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { GithubUser } from "@/types/github";
import { ROUTES } from "@/constants/routes";

interface UserCardProps {
  user: GithubUser;
}

export function UserCard({ user }: UserCardProps) {
  const isOrg = user.type === "Organization";

  return (
    <motion.div variants={cardItem}>
      <Link
        href={ROUTES.USER(user.login)}
        className="group block"
        aria-label={`View profile ${user.login}`}
      >
        <article className="relative flex h-full flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
          {/* External link affordance */}
          <ArrowUpRight className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Avatar */}
          <div className="relative mb-4 h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src={user.avatar_url}
              alt={user.login}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          {/* Login */}
          <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors max-w-full">
            {user.login}
          </h3>

          {/* Type badge */}
          <span
            className={cn(
              "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              isOrg
                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            )}
          >
            {isOrg ? (
              <Building2 className="h-2.5 w-2.5" />
            ) : (
              <UserIcon className="h-2.5 w-2.5" />
            )}
            {isOrg ? "Organization" : "User"}
          </span>

          <p className="mt-3 text-xs text-muted-foreground">
            View profile &amp; repositories
          </p>
        </article>
      </Link>
    </motion.div>
  );
}
