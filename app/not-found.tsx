import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or may have been moved."
      />
      <Link
        href={ROUTES.HOME}
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Back to home
      </Link>
    </div>
  );
}
