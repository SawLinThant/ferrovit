import Image from "next/image";

const BannerSection = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="container min-h-[600px]">
        <div className="grid md:grid-cols-4 w-full transform -translate-y-[8rem] gap-y-4">
          <div className="flex items-center justify-center">
            <Image
              height={385}
              width={385}
              alt="banner1.png"
              src="/images/img1.png"
              className="bg-cover"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              height={385}
              width={300}
              alt="banner1.png"
              src="/images/img4.png"
              className="bg-cover"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              height={385}
              width={385}
              alt="banner1.png"
              src="/images/img3.png"
              className="bg-cover"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              height={385}
              width={300}
              alt="banner1.png"
              src="/images/img2.png"
              className="bg-cover"
            />
          </div>
        </div>
        <div className="flex flex-col px-4 md:px-0 gap-10 md:-translate-y-[3rem]">
            <h1 className="text-3xl font-semibold">Lorem ipsum dolor sit amet consectetur. Enim massa libero eu nisl enim.</h1>
            <div className="grid md:grid-cols-2 gap-x-4">
                <p>Lorem ipsum dolor sit amet consectetur. Non amet ultrices tortor interdum nullam erat diam amet purus. Feugiat sit iaculis ut orci odio euismod. Quam vitae nunc nunc odio. Arcu pretium feugiat nunc dignissim mauris tincidunt. Ornare faucibus adipiscing duis at. Diam integer eget duis ipsum tortor sit justo ut. Ac amet lorem vel vitae aliquet urna at amet. Lacus dolor morbi a iaculis gravida ac augue egestas malesuada. Magna ac fermentum vestibulum hendrerit mollis molestie odio. Velit pellentesque lorem adipiscing cursus tempor vulputate sapien. Non tortor quisque commodo placerat pellentesque mattis molestie. Lorem bibendum ut curabitur ac sed duis mi. Ut commodo tempor nec at quam non.</p>
                <p>Lorem ipsum dolor sit amet consectetur. Non amet ultrices tortor interdum nullam erat diam amet purus. Feugiat sit iaculis ut orci odio euismod. Quam vitae nunc nunc odio. Arcu pretium feugiat nunc dignissim mauris tincidunt. Ornare faucibus adipiscing duis at. Diam integer eget duis ipsum tortor sit justo ut. Ac amet lorem vel vitae aliquet urna at amet. Lacus dolor morbi a iaculis gravida ac augue egestas malesuada.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
