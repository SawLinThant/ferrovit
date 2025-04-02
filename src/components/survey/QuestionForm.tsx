"use client";

import { useState } from "react";
import Image from "next/image";
import RadioSelect from "../common/RadioSelect";
import { Loader2 } from "lucide-react";

interface QuestionFormProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: Array<{ value: string; label: string }>;
  image?: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function QuestionForm({
  questionNumber,
  totalQuestions,
  question,
  options,
  image = false,
  onSubmit,
}: QuestionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <div className="flex items-center justify-center mb-8">
        <div className="text-red-600 font-medium">
          Question ( {questionNumber} / {totalQuestions} )
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-900">{question}</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <RadioSelect name="choice" options={options} required />
      </div>

      {image && (
        <div className="max-w-2xl mx-auto flex flex-col justify-center items-center">
          <Image
            src="/images/hand.jpg"
            alt="Survey Image"
            width={500}
            height={500}
          />
          <div className="flex flex-row gap-x-36 mt-4">
            <span className="font-semibold">A</span>
            <span className="font-semibold">B</span>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
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
            'Next Question'
          )}
        </button>
      </div>
    </form>
  );
}
