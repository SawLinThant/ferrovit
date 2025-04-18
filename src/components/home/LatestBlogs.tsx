import Image from "next/image";
import Link from "next/link";
import ChevronRightIcon from "../common/icons/cheveron-right";
<<<<<<< HEAD

const BlogCard = ({
=======
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import { client } from "@/graphql/client";

export const BlogCard = ({
>>>>>>> upstream/main
  category,
  title,
  excerpt,
  imageUrl,
<<<<<<< HEAD
=======
  url,
>>>>>>> upstream/main
}: {
  category: string;
  title: string;
  excerpt: string;
  imageUrl: string;
<<<<<<< HEAD
=======
  url: string;
>>>>>>> upstream/main
}) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
    <Image
      src={imageUrl}
      alt={title}
      width={400}
      height={300}
      className="w-full object-cover h-48"
    />
    <div className="p-6 space-y-4">
      <span className="text-sm text-gray-500 uppercase">{category}</span>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
<<<<<<< HEAD
      <Link href="#" className="text-red-600 font-semibold hover:text-red-700">
=======
      <Link
        href={url}
        className="text-red-600 font-semibold hover:text-red-700"
      >
>>>>>>> upstream/main
        READ MORE
      </Link>
    </div>
  </div>
);

<<<<<<< HEAD
const LatestBlogs = () => {
=======
export default async function LatestBlogs() {
>>>>>>> upstream/main
  const blogs = [
    {
      category: "CATEGORY",
      title: "Lorem ipsum dolor sit amet consectetur",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla morbi pretium nulla.",
      imageUrl: "/images/blog-sample.png",
<<<<<<< HEAD
=======
      url: "/blogs/1",
>>>>>>> upstream/main
    },
    {
      category: "CATEGORY",
      title: "Lorem ipsum dolor sit amet consectetur",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla.",
      imageUrl: "/images/blog-sample.png",
<<<<<<< HEAD
=======
      url: "/blogs/2",
>>>>>>> upstream/main
    },
    {
      category: "CATEGORY",
      title: "Lorem ipsum dolor sit amet consectetur",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla.",
      imageUrl: "/images/blog-sample.png",
<<<<<<< HEAD
=======
      url: "/blogs/3",
>>>>>>> upstream/main
    },
    {
      category: "CATEGORY",
      title: "Lorem ipsum dolor sit amet consectetur",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget odio elio ac eros nunc. Lorem maecenas mattis morbi pretium nulla.",
      imageUrl: "/images/blog-sample.png",
<<<<<<< HEAD
    },
  ];
=======
      url: "/blogs/4",
    },
  ];
  const blogRepository = new BlogRepository(client);
  const blogService = new BlogService(blogRepository);
  const allBlogs = await blogService.getAllBlogs();
  const latestBlogs = allBlogs.slice(0,8)
>>>>>>> upstream/main

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-red-600">Our Latest Blogs</h2>
<<<<<<< HEAD
          <div className="flex space-x-4">
=======
          {/* <div className="flex space-x-4">
>>>>>>> upstream/main
            <button className="w-10 h-10 rounded-xl border border-red-600 flex items-center rotate-180 justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
              <ChevronRightIcon height="10" width="10" color="white" />
            </button>
            <button className="w-10 h-10 rounded-xl border border-red-600 flex items-center justify-center bg-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer">
              <ChevronRightIcon height="10" width="10" color="white" />
            </button>
<<<<<<< HEAD
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
=======
          </div> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestBlogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              category={blog.subtitle || ""}
              excerpt={blog.highlight_text || ""}
              imageUrl={blog.image || ""}
              url={`/blogs/${blog.id}`}
            />
>>>>>>> upstream/main
          ))}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
};

export default LatestBlogs;
=======
}
>>>>>>> upstream/main
