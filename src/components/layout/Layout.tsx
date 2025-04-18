import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
<<<<<<< HEAD
      <Navbar />
=======
      <Navbar isHome={false}/>
>>>>>>> upstream/main
      <main className="flex-grow dark:bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 