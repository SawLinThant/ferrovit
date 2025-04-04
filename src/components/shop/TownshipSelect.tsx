'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface TownshipSelectProps {
  townships: {
    value: string;
    label: string;
  }[];
  selectedTownship?: string;
}

const TownshipSelect = ({ townships, selectedTownship }: TownshipSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (township: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (township === 'All') {
      params.delete('township');
    } else {
      params.set('township', township);
    }
    router.push(`/shop-directories?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between"
      >
        <span className="text-gray-700">
          {selectedTownship || 'Select Township'}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div className="py-1">
            <button
              onClick={() => handleSelect('All')}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
            >
              All
            </button>
            {townships.map((township,index) => (
              <button
                key={index}
                onClick={() => handleSelect(township.value)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
              >
                {township.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TownshipSelect; 