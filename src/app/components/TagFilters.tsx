"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

interface TagFiltersProps {
  allTags: string[];
  selectedTag?: string | null;
}

export default function TagFilters({ allTags, selectedTag }: TagFiltersProps) {
  const router = useRouter();
  const [optimisticSelectedTag, setOptimisticSelectedTag] =
    useState(selectedTag);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  const handleTagClick = useCallback(
    (tag: string) => {
      // Optimistically update the UI
      setOptimisticSelectedTag(optimisticSelectedTag === tag ? null : tag);

      // Update the URL in a transition
      startTransition(() => {
        if (optimisticSelectedTag === tag) {
          router.replace("/", { scroll: false });
        } else {
          router.replace(`?tag=${encodeURIComponent(tag)}`, { scroll: false });
        }
      });
    },
    [router, optimisticSelectedTag]
  );

  return (
    <div className="relative pb-6 flex flex-wrap justify-center gap-2">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`
            relative px-4 min-w-11 py-2 text-sm rounded-full transition-all
            ${
              optimisticSelectedTag === tag
                ? "bg-[#18181B] text-white"
                : "bg-[#F4F4F5] hover:bg-[#E4E4E7]"
            }
          `}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
