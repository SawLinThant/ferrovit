import Layout from '@/components/layout/Layout';
import StoreCard from '@/components/shop/StoreCard';
import TownshipSelect from '@/components/shop/TownshipSelect';
import Image from 'next/image';

// This would typically come from your database or API
const townships = [
  'Yangon',
  'Mandalay',
  'Naypyidaw',
  'Bago',
  'Mawlamyine',
  'Pathein',
];

const stores = [
  {
    id: 1,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
  {
    id: 2,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
  {
    id: 3,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
  {
    id: 4,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
  {
    id: 5,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
  {
    id: 6,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
  {
    id: 7,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
  {
    id: 8,
    name: 'City Mart, Myaynikone',
    address: 'Corner of Pyay Road, Shin Saw Pu, Yangon, Myanmar (Burma)',
    phone: '+95 1 510 697',
  },
];

type SearchParamsType = Promise<{ township?: string }>;

export default async function ShopDirectories({ searchParams }: { searchParams: SearchParamsType }) {
  const resolvedSearchParams = await searchParams;
  const selectedTownship = resolvedSearchParams.township;

  const filteredStores = selectedTownship
    ? stores.filter(store => store.address.includes(selectedTownship))
    : stores;

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Map Section */}
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
                townships={townships}
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
            {filteredStores.map((store) => (
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