import Link from 'next/link';
import FacebookIcon from '../common/icons/facebook-icon';
import InstagramIcon from '../common/icons/instagram-icons';
import XIcon from '../common/icons/x-icon';
import clsx from 'clsx';

interface NavbarProps {
  isHome?: boolean;
}

const Navbar = ({isHome = false }: NavbarProps) => {
  return (
    <nav className={clsx("flex items-center justify-center px-8 py-8 relative border-b border-gray-300",{
      "bg-[#F12E2A]": !isHome,
      "bg-transparent": isHome,
    })}>
      <div className="absolute inset-0"></div>
      
      <div className='container flex items-center justify-between relative z-10'>
        <div className="flex items-center space-x-8">
          {/* <Link href="/">
            <Image src="/logo.png" alt="Ferrovit Logo" width={120} height={40} />
          </Link> */}
          <div className="space-x-6 text-white">
            <Link href="/" className="hover:text-gray-200">Home</Link>
            <Link href="/about" className="hover:text-gray-200">About</Link>
            <Link href="/blogs" className="hover:text-gray-200">Blogs</Link>
            <Link href="/shop" className="hover:text-gray-200">Shop Directories</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://facebook.com" className="text-gray-800 hover:text-red-600">
            <i className="fab fa-facebook-f"><FacebookIcon height="24" width="24" color="white"/></i>
          </Link>
          <Link href="https://twitter.com" className="text-gray-800 hover:text-red-600">
            <i className="fab fa-twitter"><XIcon height="24" width="24" color="white"/></i>
          </Link>
          <Link href="https://instagram.com" className="text-gray-800 hover:text-red-600">
            <i className="fab fa-instagram"><InstagramIcon height="24" width="24" color="white"/></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 