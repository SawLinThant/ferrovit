import Layout from "@/components/layout/Layout";
import { client } from "@/graphql/client";
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import BlogList from "@/components/blog/BlogList";

export default async function Blogs() {
  const blogRepository = new BlogRepository(client);
  const blogService = new BlogService(blogRepository);
  const blogs = await blogService.getAllBlogs();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <section className="container relative w-full p-6 md:h-[60vh] h-[70vh] bg-red-600 flex items-center justify-center mt-16 rounded-lg bg-[url('/images/blogheader.jpg')] bg-cover bg-center">
          <div className="absolute bottom-[4rem] left-[4rem] text-center text-white">
            <h3 className="text-left">Featured</h3>
            <h1 className="text-xl text-left font-bold mb-4">
              Understanding the Importance of Iron for Women's Health
            </h1>
            <p className="text-sm max-w-2xl text-left">
              Iron deficiency is a prevalent health concern affecting millions of women worldwide. It often results from inadequate dietary intake, increased iron requirements during pregnancy, or chronic blood loss due to heavy menstrual periods.
            </p>
          </div>
        </section>

        <section className="container w-full py-8 px-4">
          <h2 className="text-2xl font-semibold mb-6">Related Blog Posts</h2>
          <BlogList initialBlogs={blogs} />
        </section>
      </div>
    </Layout>
  );
}
