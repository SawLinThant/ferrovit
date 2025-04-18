import Link from 'next/link';
import LocationIcon from '../common/icons/location';
import PhoneIcon from '../common/icons/phone';

interface StoreCardProps {
  name: string;
  address: string;
  phone: string;
}

const StoreCard = ({ name, address, phone }: StoreCardProps) => {
  return (
    <div className="bg-[#F1F3F8] p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{name}</h3>
      
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className='pt-1.5'>
          <LocationIcon height="16" width="16" color="#F12E2A" />
          </div>
          
          <p className="text-gray-600">{address}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <PhoneIcon height="16" width="16" color="#F12E2A" />
          <p className="text-gray-600">{phone}</p>
        </div>
      </div>
      
      <Link 
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
        target="_blank"
        className="inline-block mt-4 text-red-600 hover:text-red-700 font-medium w-full text-right underline"
      >
        View On Map
      </Link>
    </div>
  );
};

export default StoreCard; 