"use client";

import { useState } from "react";
import Input from "@/components/common/Input";
import Dropdown from "@/components/common/Dropdown";
import { ArrowRight, Loader2 } from "lucide-react";

interface PersonalInfoFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function PersonalInfoForm({ onSubmit }: PersonalInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const townshipOptions = [
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
    { value: "EastDagon", label: "East Dagon" },
    { value: "Shwepyitha", label: "Shwepyitha" },
    { value: "Hmawbi", label: "Hmawbi" },
    { value: "Hlegu", label: "Hlegu" },
    { value: "Taikkyi", label: "Taikkyi" },
    { value: "Htantabin", label: "Htantabin" },
    { value: "Zay", label: "Zay" },
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(event.currentTarget);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 flex flex-col items-center">
        <div className="mt-6 lg:w-3/5 w-full">
          <Input
            label="သင့်ဖုန်းနံပါတ်?"
            name="phone"
            type="tel"
            placeholder="Your answer"
            required
          />
        </div>

        <div className="mt-6 md:w-3/5 w-full">
          <Dropdown
            label="သင်နေထိုင်ရာ မြို့နယ်"
            name="township"
            options={townshipOptions}
            required
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#F12E2A] text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                စောင့်ဆိုင်းပါ...
              </>
            ) : (
              <>
                Start Survey
                <ArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
