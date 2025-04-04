"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Upload, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUploadToS3 } from "@/hooks/useFileUpload";
import { Blog } from "@/entities/blogs.entity";
import { UPDATE_BLOG } from "@/graphql/mutation/blogs.mutation";

interface UpdateBlogFormProps {
  blog: Blog
}

export default function UpdateBlogForm({ blog }: UpdateBlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(blog.image || null);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadToS3 } = useUploadToS3();

  const [updateBlog] = useMutation(UPDATE_BLOG, {
  //  refetchQueries: [{ query: GET_BLOGS }],
    onCompleted: () => {
      setIsSubmitting(false);
      toast.success("Blog updated successfully!");
      setTimeout(() => {
        router.push("/dashboard/blog");
      }, 1000);
    },
    onError: (error) => {
      setIsSubmitting(false);
      setError(error.message);
      toast.error("Failed to update blog");
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      let imageUrl = blog.image;

      if (file) {
        const uploadedImageUrl = await uploadToS3(file);
        if (uploadedImageUrl) {
          imageUrl = uploadedImageUrl;
        } else {
          toast.error("Failed to upload image");
          setIsSubmitting(false);
          return;
        }
      }

      const blogData = {
        id: blog.id,
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        author: formData.get("author") as string,
        description: formData.get("description") as string,
        highlight_text: formData.get("highlight_text") as string,
        image: imageUrl,
      };

      if (!blogData.title || !blogData.author || !blogData.description) {
        throw new Error("Title, author, and description are required");
      }

      await updateBlog({
        variables: {
          id: blog.id,
          input: blogData,
        },
      });
    } catch (err: any) {
      console.error("Error updating blog:", err);
      setError(err.message || "Failed to update blog");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-[60vw] mx-auto border p-8 rounded-lg bg-gray-50"
    >
      <div className="mb-4">
        <input
          type="text"
          name="title"
          defaultValue={blog.title}
          placeholder="Blog Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="subtitle"
          defaultValue={blog.subtitle || ""}
          placeholder="Subtitle"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="author"
          defaultValue={blog.author}
          placeholder="Author Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <textarea
          name="description"
          defaultValue={blog.description}
          placeholder="Blog Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          required
        />
      </div>

      <div className="mb-4">
        <textarea
          name="highlight_text"
          defaultValue={blog.highlight_text || ""}
          placeholder="Highlight Text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm font-medium">Image Upload</label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px]">
                <p className="text-sm">
                  Recommended image ratio is 16:9 (width:height).
                  <br />
                  Minimum dimensions: 1200x675 pixels.
                  <br />
                  Maximum file size: 5MB.
                  <br />
                  Supported formats: JPG, PNG, WebP.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <div 
          onClick={handleImageClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-red-500 transition-colors"
        >
          {previewUrl ? (
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-48 mx-auto rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewUrl(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-gray-600">Click to upload an image</p>
              <p className="text-sm text-gray-500">or drag and drop</p>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-red-500 text-white font-semibold py-3 rounded-full transition-colors flex flex-row items-center justify-center ${
          isSubmitting ? "cursor-not-allowed opacity-60" : "hover:bg-red-600"
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            {" please wait..."}
          </>
        ) : (
          "Update Blog"
        )}
      </button>
    </form>
  );
}