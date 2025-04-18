"use client";

import { useState, useRef } from "react";
import clsx from "clsx";
import { Loader2} from "lucide-react";
import { toast } from "sonner";
import { townshipOptions } from "@/lib/constant";

interface CreateBlogFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function CreateAddressForm({ onSubmit }: CreateBlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);

      await onSubmit(formData);
      
      if (formRef.current) {
        formRef.current.reset();
      }
      toast.success("Address created successfully!");
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(err.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="w-[60vw] mx-auto border p-8 rounded-lg bg-gray-50"
    >
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Clinic Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <select
          name="township"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          defaultValue=""
        >
          <option value="" disabled>Select Township</option>
          {townshipOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="map_link"
          placeholder="Google map link"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <textarea
          name="address"
          placeholder="Detail Address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          required
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "w-full bg-red-500 text-white font-semibold py-3 rounded-full transition-colors flex flex-row items-center justify-center",
          {
            "cursor-not-allowed opacity-60": isSubmitting,
            "hover:bg-red-500": !isSubmitting,
          }
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            {" please wait..."}
          </>
        ) : (
          "Create Address"
        )}
      </button>
    </form>
  );
}
