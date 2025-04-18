import Dashboard from "@/components/layout/Dashboard";
import { redirect } from "next/navigation";
import { getServerApolloClient } from "@/graphql/client";
import { BlogRepository } from "@/services/blogs/blogs.repository";
import { BlogService } from "@/services/blogs/blogs.service";
import { Suspense } from "react";
import CreateBlogForm from "@/components/blog/BlogForm";
import { ClinicAddressRepository } from "@/services/clinic-addresses/clinic_addresses.repository";
import { ClinicAddressService } from "@/services/clinic-addresses/clinic_addresses.service";
import CreateAddressForm from "@/components/address/AddressForm";

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F12E2A]"></div>
    </div>
  );
}

const client = await getServerApolloClient();
const clinicRepository = new ClinicAddressRepository(client);
const clinicService = new ClinicAddressService(clinicRepository);

export default async function CreateClinic() {
  async function handleSubmit(formData: FormData) {
    "use server";
   // console.log("Form submission received on server");

    const clinicData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      map_link: formData.get("map_link") as string,
      township: formData.get("township") as string,
    };

    console.log("Blog data in create page:", clinicData);

    try {

     await clinicService.createClinicAddress({
        name: clinicData.name,
        phone: clinicData.phone,
        address: clinicData.address,
        google_map_link: clinicData.map_link,
        township:clinicData.township
     })

     // redirect("/dashboard/blog");
    } catch (error: any) {
      console.error("Error creating blog:", error);
      throw new Error(error.message || "Failed to create blog");
    }
  }

  return (
    <Dashboard title="Clinic" breadcrumb="Create Clinic">
      <Suspense fallback={<LoadingFallback />}>
        <h2 className="text-2xl font-bold mb-6">Create Clinic</h2>
        <CreateAddressForm onSubmit={handleSubmit}/>
      </Suspense>
    </Dashboard>
  );
}