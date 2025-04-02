import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ChevronRightIcon from "@/components/common/icons/cheveron-right";
import FacebookIcon from "@/components/common/icons/facebook-icon";
import XIcon from "@/components/common/icons/x-icon";
import InstagramIcon from "@/components/common/icons/instagram-icons";
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import { client } from "@/graphql/client";

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

const mockRelatedPosts: RelatedPost[] = [
  {
    slug: "post-1",
    title: "Lorem ipsum dolor sit amet consectetur. Tincidunt mi a.",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla.",
    image: "/images/blog-sample.png",
  },
  {
    slug: "post-2",
    title: "Lorem ipsum dolor sit amet consectetur. Tincidunt mi a.",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla.",
    image: "/images/blog-sample.png",
  },
  {
    slug: "post-3",
    title: "Lorem ipsum dolor sit amet consectetur. Tincidunt mi a.",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla.",
    image: "/images/blog-sample.png",
  },
  {
    slug: "post-4",
    title: "Lorem ipsum dolor sit amet consectetur. Tincidunt mi a.",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla.",
    image: "/images/blog-sample.png",
  },
];

type Params = Promise<{ slug: string }>;

export default async function BlogDetail({ params }: { params: Params }) {
  const resolvedParams = await params;
  const blogRepository = new BlogRepository(client);
  const blogService = new BlogService(blogRepository);
  const blogPost = await blogService.getBlogById(resolvedParams.slug);
  const allBlogs = await blogService.getAllBlogs();
  const currentIndex = allBlogs.findIndex(
    (blog) => blog.id === resolvedParams.slug
  );

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
              src="/images/background.jpg"
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
                  <button className="w-10 h-10 rounded-xl border border-red-600 flex items-center rotate-180 justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
                    <ChevronRightIcon height="10" width="10" color="white" />
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-red-600 flex items-center justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
                    <ChevronRightIcon height="10" width="10" color="white" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockRelatedPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
