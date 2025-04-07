import Dashboard from "@/components/layout/Dashboard";
import { redirect } from "next/navigation";
import { getServerApolloClient } from "@/graphql/client";
import { ClinicAddressRepository } from "@/services/clinic-addresses/clinic_addresses.repository";
import { ClinicAddressService } from "@/services/clinic-addresses/clinic_addresses.service";
import { Suspense } from "react";
import UpdateClinicForm from "@/components/clinic/UpdateClinicForm";
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
      <h3 className="text-xl font-bold text-red-700 mb-2">Error Loading Clinic</h3>
      <p className="text-red-600 mb-4">{error}</p>
      <CorsHelper />
      <Link href="/dashboard/clinic" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 inline-block">
        Return to Clinic List
      </Link>
    </div>
  );
}

type Params = Promise<{ id: string }>;

export default async function ClinicDetail({ params }: { params: Params }) {
  const resolvedParams = await params;

  try {
    const client = await getServerApolloClient();
    const clinicRepository = new ClinicAddressRepository(client);
    const clinicService = new ClinicAddressService(clinicRepository);

    try {
      const clinic = await clinicService.getClinicById(resolvedParams.id);
      if (!clinic) {
        redirect("/dashboard/clinic"); 
      }

      return (
        <Dashboard title="Clinic" breadcrumb="Detail">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Clinic</h2>
          </div>
          
          <Suspense fallback={<LoadingFallback />}>
            <ApolloProvider>
              <UpdateClinicForm clinic={clinic} />
            </ApolloProvider>
          </Suspense>
        </Dashboard>
      );
    } catch (error) {
      console.error("Error loading clinic:", error);
      return (
        <Dashboard title="Clinic" breadcrumb="Detail">
          <ErrorFallback error="Failed to load clinic details. The clinic may have been deleted or you don't have permission to view it." />
        </Dashboard>
      );
    }
  } catch (error) {
    console.error("Critical error setting up Apollo client:", error);
    return (
      <Dashboard title="Clinic" breadcrumb="Detail">
        <ErrorFallback error="Failed to connect to the server. Please try again later." />
      </Dashboard>
    );
  }
} 