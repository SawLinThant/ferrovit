'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/common/Input';
import Dropdown from '@/components/common/Dropdown';

interface QuizUserFiltersProps {
  onFilterChange: (filters: {
    phone?: string;
    address?: string;
    created_at?: string;
  }) => void;
  initialValues?: {
    phone?: string;
    address?: string;
    created_at?: string;
  };
}

const addressOptions = [
  { value: "All", label: "All" },
  { value: "NorthDagon", label: "North Dagon" },
  { value: "SouthDagon", label: "South Dagon" },
  { value: "EastDagon", label: "East Dagon" },
  { value: "WestDagon", label: "West Dagon" },
  { value: "DagonMyothit", label: "Dagon Myothit" },
  { value: "Dawbon", label: "Dawbon" },
  { value: "MingalarTaungNyunt", label: "Mingalar Taung Nyunt" },
  { value: "Tamwe", label: "Tamwe" },
  { value: "Bahan", label: "Bahan" },
  { value: "Kyauktada", label: "Kyauktada" },
  { value: "Pabedan", label: "Pabedan" },
  { value: "Lanmadaw", label: "Lanmadaw" },
  { value: "Latha", label: "Latha" },
  { value: "Ahlone", label: "Ahlone" },
  { value: "Kyimyindine", label: "Kyimyindine" },
  { value: "Sanchaung", label: "Sanchaung" },
  { value: "Hlaing", label: "Hlaing" },
  { value: "Kamayut", label: "Kamayut" },
  { value: "Mayangone", label: "Mayangone" },
  { value: "Yankin", label: "Yankin" },
  { value: "Thingangyun", label: "Thingangyun" },
  { value: "NorthOkkalapa", label: "North Okkalapa" },
  { value: "SouthOkkalapa", label: "South Okkalapa" },
  { value: "Shwepyitha", label: "Shwepyitha" },
  { value: "Hmawbi", label: "Hmawbi" },
  { value: "Hlegu", label: "Hlegu" },
  { value: "Taikkyi", label: "Taikkyi" },
  { value: "Htantabin", label: "Htantabin" },
  { value: "Zay", label: "Zay" },
];

export default function QuizUserFilters({ onFilterChange, initialValues }: QuizUserFiltersProps) {
  const [phone, setPhone] = useState(initialValues?.phone || '');
  const [address, setAddress] = useState(initialValues?.address || '');
  const [created_at, setCreatedAt] = useState(initialValues?.created_at || '');

  useEffect(() => {
    if (initialValues) {
      setPhone(initialValues.phone || '');
      setAddress(initialValues.address || '');
      setCreatedAt(initialValues.created_at || '');
    }
  }, [initialValues]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    onFilterChange({ phone: value, address, created_at });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAddress(value);
    onFilterChange({ phone, address: value, created_at });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCreatedAt(value);
    onFilterChange({ phone, address, created_at: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Input
        label="Phone"
        name="phone"
        type="tel"
        placeholder="Search by phone number"
        value={phone}
        onChange={handlePhoneChange}
      />
      <Dropdown
        label="Address"
        name="address"
        options={addressOptions}
        value={address}
        onChange={handleAddressChange}
      />
      <div className="mb-4">
        <label htmlFor="created_at" className="block text-sm font-medium text-gray-700 mb-3">
          Date
        </label>
        <input
          type="date"
          id="created_at"
          name="created_at"
          value={created_at}
          onChange={handleDateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
      </div>
    </div>
  );
} 