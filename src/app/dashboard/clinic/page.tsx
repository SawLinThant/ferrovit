import { DataTable } from "@/components/common/custom-table/table";
import Dashboard from "@/components/layout/Dashboard";
import { getServerApolloClient } from "@/graphql/client";
import { getServerAuthToken } from "@/lib/server/auth";
import { ClinicAddressRepository } from "@/services/clinic-addresses/clinic_addresses.repository";
import { ClinicAddressService } from "@/services/clinic-addresses/clinic_addresses.service";
import { AddressColumns } from "@/components/common/custom-table/columns/addresses";

interface PageProps {
  searchParams: Promise<{
    township?: string;
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
  const clinicAddressRepository = new ClinicAddressRepository(client);
  const clinicAddressService = new ClinicAddressService(clinicAddressRepository);

  

  const processedSearchParams = {
    ...resolvedSearchParams,
    address: resolvedSearchParams.address === "All" ? undefined : resolvedSearchParams.address,
    page: Number(resolvedSearchParams.page) || 1,
    pageSize: 10,
  };

  const blogs = clinicAddressService.getFilteredClinicAddresses(processedSearchParams)

  return (
    <Dashboard title="Clinic" breadcrumb="clinic list">
      <h2 className="text-2xl font-bold mb-6">Clinic</h2>
      <DataTable
        columns={AddressColumns}
        data={(await blogs).clinic_addresses}
        totalCount={(await blogs).total_count}
        page={processedSearchParams.page}
        pageSize={processedSearchParams.pageSize}
      />
    </Dashboard>
  );
}
