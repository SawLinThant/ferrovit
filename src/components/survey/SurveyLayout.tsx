import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SurveyLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit?: (formData: FormData) => void;
  previousLink: string;
  previousText: string;
  isPersonalInfo: boolean;
}

const SurveyLayout = ({
  title,
  description,
  children,
  onSubmit,
  previousLink,
  isPersonalInfo,
  previousText,
}: SurveyLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 justify-start items-start">
          {!isPersonalInfo && (
            <div className="flex flex-row items-center gap-4">
              <span>Home</span>
              <span>/</span>
              <span className="font-semibold">Survey</span>
            </div>
          )}

          <Link
            href={previousLink}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            {!isPersonalInfo ? <ArrowLeft className="w-4 h-4 mr-2" /> : null}
            {previousText}
          </Link>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#F12E2A] mb-4">{title}</h1>
              <p className="text-gray-600 font-semibold">{description}</p>
            </div>

            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyLayout;
