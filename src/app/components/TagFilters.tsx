"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface TagFiltersProps {
  allTags: string[];
  selectedTag?: string | null;
}

export default function TagFilters({ allTags, selectedTag }: TagFiltersProps) {
  const router = useRouter();

  const handleTagClick = useCallback(
    (tag: string) => {
      if (selectedTag === tag) {
        router.push("/", { scroll: false });
      } else {
        router.push(`?tag=${encodeURIComponent(tag)}`, { scroll: false });
      }
    },
    [router, selectedTag]
  );

  return (
    <div className="py-4 flex flex-wrap justify-center gap-2">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-4 min-w-11 py-2 text-sm rounded-full transition-colors ${
            selectedTag === tag
              ? "bg-[#18181B] text-white"
              : "bg-[#F4F4F5] hover:bg-[#E4E4E7]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
