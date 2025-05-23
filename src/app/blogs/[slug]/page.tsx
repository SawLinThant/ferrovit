import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ChevronRightIcon from "@/components/common/icons/cheveron-right";
import FacebookIcon from "@/components/common/icons/facebook-icon";
import XIcon from "@/components/common/icons/x-icon";
import InstagramIcon from "@/components/common/icons/instagram-icons";
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import { client } from "@/graphql/client";
import { BlogCard } from "@/components/home/LatestBlogs";

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ page?: string }>;

const POSTS_PER_PAGE = 8;

export default async function BlogDetail({ 
  params,
  searchParams 
}: { 
  params: Params;
  searchParams: SearchParams;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  const blogRepository = new BlogRepository(client);
  const blogService = new BlogService(blogRepository);
  const blogPost = await blogService.getBlogById(resolvedParams.slug);
  const allBlogs = await blogService.getAllBlogs();
  const currentIndex = allBlogs.findIndex(
    (blog) => blog.id === resolvedParams.slug
  );

  // Filter out current blog and implement pagination
  const filteredBlogs = allBlogs.filter(
    (blog) => blog.id !== resolvedParams.slug
  );
  
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  
  const relatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const previousBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb and Navigation */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-red-600">
                HOME
              </Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-red-600">
                BLOGS
              </Link>
            </div>
            <div className="flex items-center space-x-4"></div>
          </div>

          {/* Blog Header */}
          <div className="text-center mb-12">
            <div className="w-full flex flex-row items-center justify-between">
              {previousBlog ? (
                <Link
                  href={`/blogs/${previousBlog.id}`}
                  className="flex gap-3 items-center font-semibold text-gray-400 hover:text-red-600 text-sm"
                >
                  <div className="w-10 h-10 rounded-lg border border-red-600 flex items-center rotate-180 justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
                    <ChevronRightIcon height="10" width="10" color="white" />
                  </div>
                  <span className="hidden md:block">READ PREVIOUS</span>
                </Link>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex gap-3 items-center font-semibold text-gray-400 text-sm opacity-50 cursor-not-allowed"
                >
                  <div className="w-10 h-10 rounded-lg border border-gray-300 flex items-center rotate-180 justify-center bg-gray-300 text-gray-500">
                    <ChevronRightIcon height="10" width="10" color="gray" />
                  </div>
                  <span className="hidden md:block">READ PREVIOUS</span>
                </div>
              )}

              <span className="inline-block bg-red-600 text-white px-6 py-2 rounded-md font-medium text-sm">
                {blogPost.subtitle}
              </span>

              {nextBlog ? (
                <Link
                  href={`/blogs/${nextBlog.id}`}
                  className="flex gap-3 items-center font-semibold text-gray-400 hover:text-red-600 text-sm"
                >
                  <span className="hidden md:block">READ NEXT</span>
                  <div className="w-10 h-10 rounded-lg border border-red-600 flex items-center justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
                    <ChevronRightIcon height="10" width="10" color="white" />
                  </div>
                </Link>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex gap-3 items-center font-semibold text-gray-400 text-sm opacity-50 cursor-not-allowed"
                >
                  <span className="hidden md:block">READ NEXT</span>
                  <div className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center bg-gray-300 text-gray-500">
                    <ChevronRightIcon height="10" width="10" color="gray" />
                  </div>
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
              {blogPost.title}
            </h1>
            <div className="text-gray-600 mt-8">
              Written by{" "}
              <span className="font-bold text-black">{blogPost.author}</span>
              <br />
              <span className="text-black font-bold">
                {new Date(blogPost.created_at).toDateString()}
              </span>
            </div>
          </div>

          {/* Blog Image */}
          <div className="relative w-full h-[600px] mb-12">
            <Image
              src={blogPost.image || ""}
              alt={blogPost.title}
              fill
              className="md:object-contain object-cover"
            />
          </div>
          <div className="relative max-w-3xl mx-auto prose prose-lg">
            <div className="absolute left-8 top-0 transform -translate-x-36 space-y-4 py-4 px-2 bg-[#F1F3F8]">
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center"
              >
                <FacebookIcon width="20" height="20" color="#000" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10  flex items-center justify-center"
              >
                <XIcon width="20" height="20" color="#000" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center"
              >
                <InstagramIcon width="20" height="20" color="#000" />
              </Link>
            </div>
            <div className="flex flex-col gap-8">
              <div className="whitespace-pre-wrap">
                {blogPost.description.split(/\s+/).slice(0, 50).join(" ")}
              </div>
              <div className="w-full p-6 rounded-md bg-[#F1F3F8] font-semibold">
                <p className="text-xl">{blogPost.highlight_text}</p>
              </div>
              <div className="whitespace-pre-wrap">
                {blogPost.description.split(/\s+/).slice(50).join(" ")}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="w-full bg-[#F1F3F8] pb-8">
          <div className="container mx-auto px-4 py-8">
            <div className="mt-16">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold text-red-600">
                  Related Blog Posts
                </h2>
                <div className="flex space-x-4">
                  <Link
                    href={`/blogs/${resolvedParams.slug}?page=${Math.max(1, currentPage - 1)}`}
                    className={`w-10 h-10 rounded-xl border flex items-center rotate-180 justify-center ${
                      currentPage === 1
                        ? "border-gray-300 bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "border-red-600 bg-red-600 text-white hover:bg-red-600 hover:text-white hover:cursor-pointer"
                    }`}
                  >
                    <ChevronRightIcon height="10" width="10" color={currentPage === 1 ? "gray" : "white"} />
                  </Link>
                  <Link
                    href={`/blogs/${resolvedParams.slug}?page=${Math.min(totalPages, currentPage + 1)}`}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                      currentPage === totalPages
                        ? "border-gray-300 bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "border-red-600 bg-red-600 text-white hover:bg-red-600 hover:text-white hover:cursor-pointer"
                    }`}
                  >
                    <ChevronRightIcon height="10" width="10" color={currentPage === totalPages ? "gray" : "white"} />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBlogs.map((blog) => (
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
              {relatedBlogs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">No related posts found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
