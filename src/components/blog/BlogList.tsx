"use client";

import { BlogCard } from "@/components/home/LatestBlogs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const INITIAL_POSTS_COUNT = 8;
const POSTS_PER_LOAD = 8;

interface BlogListProps {
  initialBlogs: any[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [displayedBlogs, setDisplayedBlogs] = useState<any[]>(
    initialBlogs.slice(0, INITIAL_POSTS_COUNT)
  );
  const [hasMore, setHasMore] = useState(
    initialBlogs.length > INITIAL_POSTS_COUNT
  );

  const loadMore = () => {
    const currentLength = displayedBlogs.length;
    const nextBatch = initialBlogs.slice(
      currentLength,
      currentLength + POSTS_PER_LOAD
    );
    setDisplayedBlogs([...displayedBlogs, ...nextBatch]);
    setHasMore(displayedBlogs.length + POSTS_PER_LOAD < initialBlogs.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            category={blog.subtitle || ""}
            excerpt={blog.highlight_text || ""}
            imageUrl={blog.image || ""}
            url={`/blogs/${blog.id}`}
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            View More
          </Button>
        </div>
      )}
    </>
  );
} 