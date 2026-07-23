import { Suspense } from "react";
import { SearchContent } from "./SearchContent";
import { SearchGridSkeleton } from "@/components/common/SkeletonCard";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SearchGridSkeleton />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
