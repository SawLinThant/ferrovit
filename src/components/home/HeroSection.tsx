import Image from "next/image";
<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> upstream/main

const HeroSection = () => {
  return (
    <div className="relative  min-h-[600px] flex items-center">
      <div className="absolute inset-0"></div>

      <div className="container mx-auto md:py-0 py-12 px-8 flex items-center gap-y-8 flex-col md:flex-row justify-between relative z-10">
        <div className="md:w-1/2 w-full md:order-1 order-2">
          <Image
            src="/images/hero.png"
            alt="Ferrovit Product"
            width={400}
            height={400}
            className="bg-white p-8 rounded-full"
          />
        </div>
        <div className="md:w-1/2 w-full space-y-6 text-white md:order-2 order-1">
          <h1 className="text-5xl font-bold">
            Stride ahead with strength of iron
          </h1>
          <p className="text-lg">
            Anaemia is a common health problem among women of all ages with
            symptoms such as fatigue, headache, breathlessness, and loss of
            energy.
          </p>
          <p className="text-lg">
            Millions of women trust FERROVIT, a source of high quality iron and
            essential nutrients which helps to combat iron deficiency anaemia.
          </p>
<<<<<<< HEAD
          <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Take Quiz
          </button>
=======
          <Link href="/survey/page1" className="bg-[#F12E2A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#F12E2A]/80 transition-colors shadow-lg">
            Take Quiz
          </Link>
>>>>>>> upstream/main
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
