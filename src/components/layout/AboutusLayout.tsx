import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HeroSection from '../home/HeroSection';

interface LayoutProps {
  children: ReactNode;
}

const AboutUsLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="flex flex-col bg-[url('/images/background.jpg')] bg-cover bg-center">
        <Navbar isHome={true}/>
           <div className="min-h-[600px] flex items-center justify-center p-4">
            <div className='w-full h-full flex flex-col items-center justify-center gap-8'>
                <h1 className='text-3xl font-semibold text-white text-center'>About Us</h1>
                <p className='md:max-w-[40vw] text-white'>Lorem ipsum dolor sit amet consectetur. Posuere curabitur integer viverra tortor platea quis habitant nibh nibh. Id nulla ut quis lacus. Quis aliquet in cursus gravida tellus. Interdum ultrices sapien consequat enim urna.
                Lectus enim urna congue senectus placerat non libero ultricies. Risus in arcu orci viverra odio amet nunc. Mattis.</p>
            </div>
           </div>
        </div>
      <main className="flex-grow dark:bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsLayout;