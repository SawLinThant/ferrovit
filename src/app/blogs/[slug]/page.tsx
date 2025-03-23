import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ChevronRightIcon from "@/components/common/icons/cheveron-right";
import FacebookIcon from "@/components/common/icons/facebook-icon";
import XIcon from "@/components/common/icons/x-icon";
import InstagramIcon from "@/components/common/icons/instagram-icons";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  content: string;
  category: string;
}

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
  const resolvedParams = await params; // Await the params Promise
  const { slug } = resolvedParams;
  const blogPost: BlogPost = {
    title:
      "Empowering Women's Health: Overcoming Iron Deficiency with Supplements",
    author: "Dr. Sophie Patel",
    date: "March 15, 2024, 10:00 AM",
    category: "IRON IN BLOOD",
    content: `Iron deficiency is a prevalent health concern affecting millions of women worldwide. It often results from inadequate dietary intake, increased iron requirements during pregnancy, or chronic blood loss due to heavy menstruation. This condition can significantly impact daily activities, causing fatigue, decreased productivity, and shortness of breath. Understanding the causes and consequences of iron deficiency is crucial for developing effective strategies to combat it.

"Iron deficiency is not just a health issue; it's a barrier to living life to the fullest. By addressing it, we empower women to take control of their well-being."

Iron supplements have emerged as a reliable solution for managing iron deficiency. These supplements come in various forms, such as ferrous sulfate or ferrous fumarate, and are designed to replenish iron stores in the body. While dietary sources of iron are essential, supplementation may be necessary for some women to achieve optimal results. Healthcare professionals recommend consulting with them to determine the appropriate dosage and regimen based on their specific needs.`,
  };

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
              <Link
                href="#"
                className="flex gap-3 items-center font-semibold text-gray-400 hover:text-red-600 text-sm"
              >
                <div className="w-10 h-10 rounded-lg border border-red-600 flex items-center rotate-180 justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
                  <ChevronRightIcon height="10" width="10" color="white" />
                </div>
               <span className="hidden md:block">READ PREVIOUS</span>
              </Link>
              <span className="inline-block bg-red-600 text-white px-6 py-2 rounded-md font-medium text-sm">
                {blogPost.category}
              </span>
              <Link
                href="#"
                className="flex gap-3 items-center font-semibold text-gray-400 hover:text-red-600 text-sm"
              >
                <span className="hidden md:block">READ NEXT</span>
                <div className="w-10 h-10 rounded-lg border border-red-600 flex items-center justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
                  <ChevronRightIcon height="10" width="10" color="white" />
                </div>
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
              {blogPost.title}
            </h1>
            <div className="text-gray-600 mt-8">
              Written by{" "}
              <span className="font-bold text-black">{blogPost.author}</span>
              <br />
              <span className="text-black font-bold">{blogPost.date}</span>
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
                {blogPost.content.split(/\s+/).slice(0, 50).join(" ")}
              </div>
              <div className="w-full p-6 rounded-md bg-[#F1F3F8] font-semibold">
                <p className="text-xl">
                  {`"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, qui. In reprehenderit commodi dolores quia deleniti neque explicabo sed ad quod, iure laudantium delectus, quisquam itaque fugiat repellendus. Tempore, quis?"`}
                </p>
              </div>
              <div className="whitespace-pre-wrap">
                {blogPost.content.split(/\s+/).slice(50).join(" ")}
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
