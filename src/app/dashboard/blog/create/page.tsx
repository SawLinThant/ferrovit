import Dashboard from "@/components/layout/Dashboard";
import { redirect } from "next/navigation";
import { getServerApolloClient } from "@/graphql/client";
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import { Suspense } from "react";
import CreateBlogForm from "@/components/blog/BlogForm";

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F12E2A]"></div>
    </div>
  );
}

const client = await getServerApolloClient();
const blogRepository = new BlogRepository(client);
const blogService = new BlogService(blogRepository);

export default async function QuizUsers() {
  async function handleSubmit(formData: FormData) {
    "use server";
    console.log("Form submission received on server");

    const blogData = {
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      author: formData.get("author") as string,
      description: formData.get("description") as string,
      highlight_text: formData.get("highlight_text") as string,
      image: formData.get("image") as string,
    };

    console.log("Blog data in create page:", blogData);

    try {
      if (!blogData.title || !blogData.author || !blogData.description) {
        throw new Error("Title, author, and description are required");
      }
      if(!blogData.image){
        throw new Error("Image is required");
      }

      console.log("image",blogData.image);

      await blogService.createBlog({
        title: blogData.title,
        subtitle: blogData.subtitle || null,
        author: blogData.author,
        description: blogData.description,
        highlight_text: blogData.highlight_text || null,
        image: blogData.image,
      });

      console.log("Blog created successfully");
     // redirect("/dashboard/blog");
    } catch (error: any) {
      console.error("Error creating blog:", error);
      throw new Error(error.message || "Failed to create blog");
    }
  }

  return (
    <Dashboard title="Blog" breadcrumb="Create Blog">
      <Suspense fallback={<LoadingFallback />}>
        <h2 className="text-2xl font-bold mb-6">Create Blog</h2>
        <CreateBlogForm onSubmit={handleSubmit} />
      </Suspense>
    </Dashboard>
  );
}