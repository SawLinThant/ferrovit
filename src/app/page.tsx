//import Layout from '@/components/layout/Layout';
//import HeroSection from '@/components/home/HeroSection';
import ProductDetails from '@/components/home/ProductDetails';
import LatestBlogs from '@/components/home/LatestBlogs';
import HomeLayout from '@/components/layout/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>
      {/* <HeroSection /> */}
      <ProductDetails />
      <LatestBlogs />
    </HomeLayout>
  );
}
