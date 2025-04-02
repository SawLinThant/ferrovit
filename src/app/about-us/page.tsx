import BannerSection from "@/components/about/banner";
import HeroSection from "@/components/about/hero";
import AboutUsLayout from "@/components/layout/AboutusLayout";

export default function Home() {
  return (
    <AboutUsLayout>
      <BannerSection/>
      <HeroSection/>
    </AboutUsLayout>
  );
}
