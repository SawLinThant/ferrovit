import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full flex items-center justify-center py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden">

          <Image
            src="/images/img5.png" 
            alt="img"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className="text-gray-600 text-base">
            Lorem ipsum dolor sit amet consectetur. Non amet ultricies tortor interdum
            nullam erat diam amet purus. Fugiat sit lacinia ut orci id eiusmod. Quam vitae nunc odio. Arcu pretium
            feugiat nunc dignissim mauris tincidunt. Ornare faucibus adipiscing duis at. Diam integer eget duis ipsum
            tortor justo ut. Ac amet vel vitae aliquet urna amet. Lacus dolor morbi a laculis gravida ac augue egestas malesuada.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
