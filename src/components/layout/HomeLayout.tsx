import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HeroSection from '../home/HeroSection';

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="flex flex-col bg-[url('/images/background.jpg')] bg-cover bg-center">
<<<<<<< HEAD
        <Navbar />
=======
        <Navbar isHome={true}/>
>>>>>>> upstream/main
        <HeroSection/>
        </div>
      <main className="flex-grow dark:bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
};

<<<<<<< HEAD
export default HomeLayout; 
=======
export default HomeLayout;
>>>>>>> upstream/main
