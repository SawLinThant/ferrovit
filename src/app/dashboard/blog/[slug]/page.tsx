import Dashboard from "@/components/layout/Dashboard";
import { redirect } from "next/navigation";
import { getServerApolloClient } from "@/graphql/client";
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import { Suspense } from "react";
import UpdateBlogForm from "@/components/blog/UpdateBlogForm";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { CorsHelper } from "@/components/common/CorsHelper";
import Link from "next/link";

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F12E2A]"></div>
    </div>
  );
}

function ErrorFallback({error}: {error: string}) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-md">
      <h3 className="text-xl font-bold text-red-700 mb-2">Error Loading Blog</h3>
      <p className="text-red-600 mb-4">{error}</p>
      <CorsHelper />
      <Link href="/dashboard/blog" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 inline-block">
        Return to Blog List
      </Link>
    </div>
  );
}

type Params = Promise<{ slug: string }>;

export default async function BlogDetail({ params }: { params: Params }) {
  const resolvedParams = await params;

  try {
    const client = await getServerApolloClient();
    const blogRepository = new BlogRepository(client);
    const blogService = new BlogService(blogRepository);

    try {
      const blogPost = await blogService.getBlogById(resolvedParams.slug);
      if (!blogPost) {
        redirect("/dashboard/blog"); 
      }

      return (
        <Dashboard title="Blog" breadcrumb="Detail">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Blog</h2>
            {/* <Link href="/dashboard/blog" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Back to List
            </Link> */}
          </div>
          
          <Suspense fallback={<LoadingFallback />}>
            <ApolloProvider>
              <UpdateBlogForm blog={blogPost} />
            </ApolloProvider>
          </Suspense>
        </Dashboard>
      );
    } catch (error) {
      console.error("Error loading blog:", error);
      return (
        <Dashboard title="Blog" breadcrumb="Detail">
          <ErrorFallback error="Failed to load blog details. The blog may have been deleted or you don't have permission to view it." />
        </Dashboard>
      );
    }
  } catch (error) {
    console.error("Critical error setting up Apollo client:", error);
    return (
      <Dashboard title="Blog" breadcrumb="Detail">
        <ErrorFallback error="Failed to connect to the server. Please try again later." />
      </Dashboard>
    );
  }
}