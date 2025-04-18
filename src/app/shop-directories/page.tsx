import Layout from '@/components/layout/Layout';
import StoreCard from '@/components/shop/StoreCard';
import TownshipSelect from '@/components/shop/TownshipSelect';
import { client } from '@/graphql/client';
import { townshipOptions } from '@/lib/constant';
import { ClinicAddressRepository } from '@/services/clinic-addresses/clinic_addresses.repository';
import { ClinicAddressService } from '@/services/clinic-addresses/clinic_addresses.service';
import Image from 'next/image';


type SearchParamsType = Promise<{ township?: string, page?: string }>;

export default async function ShopDirectories({ searchParams }: { searchParams: SearchParamsType }) {
  const resolvedSearchParams = await searchParams;
  const selectedTownship = resolvedSearchParams.township;
  const addressRepository = new ClinicAddressRepository(client);
  const clinicService = new ClinicAddressService(addressRepository);

  const processedSearchParams = {
    ...resolvedSearchParams,
    township: resolvedSearchParams.township === "All" ? undefined : resolvedSearchParams.township,
    page: Number(resolvedSearchParams.page) || 1,
    pageSize: 10,
  };


  const address = clinicService.getFilteredClinicAddresses(processedSearchParams)

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="relative w-full h-[400px] bg-black/50">
          <Image
            src="/images/map.jpg"
            alt="Store Locations Map"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center justify-center md:w-[500px] w-full px-4 py-10 bg-white rounded-lg shadow-2xl">
            <h1 className="text-4xl font-bold text-red-600 mb-8">Find a store</h1>
            <div className="w-full max-w-md px-4">
              <TownshipSelect
                townships={townshipOptions}
                selectedTownship={selectedTownship}
              />
            </div>
          </div>
        </div>

        {/* Stores List Section */}
        <div className="container mx-auto px-4 py-12 mt-30">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Township: {selectedTownship || 'All'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(await address).clinic_addresses.map((store) => (
              <StoreCard
                key={store.id}
                name={store.name}
                address={store.address}
                phone={store.phone}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 