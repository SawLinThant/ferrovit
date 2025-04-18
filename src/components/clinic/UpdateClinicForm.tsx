"use client";

import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { UPDATE_CLINIC_ADDRESS } from "@/graphql/mutation/clinic_addresses.mutation";
import { GET_ALL_CLINIC_ADDRESSES } from "@/graphql/query/clinic_addresses.query";

interface UpdateClinicFormProps {
  clinic: {
    id: string;
    name: string;
    phone: string;
    address: string;
    google_map_link: string;
    township: string;
  };
}

const TOWNSHIPS = [
  "Bahan",
  "Dagon",
  "Hlaing",
  "Kamayut",
  "Kyauktada",
  "Lanmadaw",
  "Latha",
  "Mayangon",
  "Pabedan",
  "Sanchaung",
  "Tamwe",
  "Thingangyun",
  "Yankin",
  "Other"
];

export default function UpdateClinicForm({ clinic }: UpdateClinicFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [updateClinic] = useMutation(UPDATE_CLINIC_ADDRESS, {
    refetchQueries: [{ query: GET_ALL_CLINIC_ADDRESSES }],
    onCompleted: () => {
      setIsSubmitting(false);
      toast.success("Clinic updated successfully!");
      setTimeout(() => {
        router.push("/dashboard/clinic");
      }, 1000);
    },
    onError: (error) => {
      setIsSubmitting(false);
      setError(error.message);
      toast.error("Failed to update clinic");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const clinicData = {
        id: clinic.id,
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        google_map_link: formData.get("map_link") as string,
        township: formData.get("township") as string,
      };

      if (!clinicData.name || !clinicData.phone || !clinicData.address) {
        throw new Error("Name, phone, and address are required");
      }

      await updateClinic({
        variables: {
          id: clinic.id,
          input: clinicData,
        },
      });
    } catch (err: any) {
      console.error("Error updating clinic:", err);
      setError(err.message || "Failed to update clinic");
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Clinic Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={clinic.name}
          placeholder="Enter clinic name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          defaultValue={clinic.phone}
          placeholder="Enter phone number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          defaultValue={clinic.address}
          placeholder="Enter clinic address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-24 resize-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="map_link" className="block text-sm font-medium text-gray-700 mb-1">
          Google Map Link
        </label>
        <input
          type="url"
          id="map_link"
          name="map_link"
          defaultValue={clinic.google_map_link}
          placeholder="Enter Google Map link"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="township" className="block text-sm font-medium text-gray-700 mb-1">
          Township
        </label>
        <select
          id="township"
          name="township"
          defaultValue={clinic.township}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
        >
          <option defaultValue={clinic.township} value={clinic.township}>{clinic.township}</option>
          {TOWNSHIPS.map((township) => (
            <option key={township} value={township}>
              {township}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg transition-colors flex flex-row items-center justify-center hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2" />
            Updating...
          </>
        ) : (
          "Update Clinic"
        )}
      </button>
    </form>
  );
} 