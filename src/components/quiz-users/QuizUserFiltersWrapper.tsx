'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function QuizUserFiltersWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [address, setAddress] = useState(searchParams.get("address") || "All");
  const [created_at, setCreated_at] = useState(searchParams.get("created_at") || "");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const pageSize = 10;

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (phone) {
      params.set("phone", phone);
    } else {
      params.delete("phone");
    }
    params.set("page", "1"); // Reset to first page when searching
    router.push(`?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    const params = new URLSearchParams(searchParams.toString());
    if (newAddress === "All") {
      params.delete("address");
    } else {
      params.set("address", newAddress);
    }
    params.set("page", "1"); // Reset to first page when changing address
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(Number(searchParams.get("totalCount") || 0) / pageSize);

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

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              placeholder="Search by phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <select
            value={address}
            onChange={handleAddressChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addressOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Input
            type="date"
            value={created_at}
            onChange={(e) => setCreated_at(e.target.value)}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
} 