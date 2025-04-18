import { QuizUserColumns } from "@/components/common/custom-table/columns/user";
import { DataTable } from "@/components/common/custom-table/table";
import Dashboard from "@/components/layout/Dashboard";
import { getServerApolloClient } from "@/graphql/client";
import { QuizUserRepository } from "@/services/quiz-user/quiz_users.repository";
import { QuizUserService } from "@/services/quiz-user/quiz_users.service";
import QuizUserFiltersWrapper from "@/components/quiz-users/QuizUserFiltersWrapper";
import { QuizUser, QuizUsersResponse } from "@/entities/quiz_users.entity";
import { getServerAuthToken } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import { BlogColumns } from "@/components/common/custom-table/columns/blog";

interface PageProps {
  searchParams: Promise<{
    phone?: string;
    address?: string;
    created_at?: string;
    page?: string;
  }>;
}

export default async function QuizUsers({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const authToken = await getServerAuthToken();
  const client = await getServerApolloClient({ authToken });
  const blogRepository = new BlogRepository(client);
  const blogService = new BlogService(blogRepository);

  

  const processedSearchParams = {
    ...resolvedSearchParams,
    address: resolvedSearchParams.address === "All" ? undefined : resolvedSearchParams.address,
    page: Number(resolvedSearchParams.page) || 1,
    pageSize: 10,
  };

  const blogs = blogService.getFilteredQuizUserse(processedSearchParams)


  return (
    <Dashboard title="Blog" breadcrumb="blog list">
      <h2 className="text-2xl font-bold mb-6">Blogs</h2>
      {/* <QuizUserFiltersWrapper /> */}
      <DataTable
        columns={BlogColumns}
        data={(await blogs).blogs}
        totalCount={(await blogs).total_count}
        page={processedSearchParams.page}
        pageSize={processedSearchParams.pageSize}
      />
    </Dashboard>
  );
}
