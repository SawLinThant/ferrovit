"use client";

import Link from "next/link";
import FacebookIcon from "../common/icons/facebook-icon";
import InstagramIcon from "../common/icons/instagram-icons";
import XIcon from "../common/icons/x-icon";
import clsx from "clsx";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isHome?: boolean;
}

const Navbar = ({ isHome = false }: NavbarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={clsx(
        "flex items-center justify-center px-4 md:px-8 py-4 md:py-8 relative border-b border-gray-300",
        {
          "bg-[#F12E2A]": !isHome,
          "bg-transparent": isHome,
        }
      )}
    >
      <div className="absolute inset-0"></div>

      <div className="container flex items-center justify-between relative z-10">
        <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-6 text-white">
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-gray-200">
              About
            </Link>
            <Link href="/blogs/list" className="hover:text-gray-200">
              Blogs
            </Link>
            <Link href="/shop-directories" className="hover:text-gray-200">
              Shop Directories
            </Link>
          </div>
        </div>
        <div className="w-[150px] md:w-[200px] h-[50px] md:h-[62px] relative">
          <Image
            src="/images/footer-logo.png"
            alt="Ferrovit Logo"
            fill
            className="object-contain"
          />
        </div>
        </div>
       

        <div className="flex items-center space-x-4">
          <Link
            href="https://facebook.com"
            className="text-gray-800 hover:text-red-600"
          >
            <i className="fab fa-facebook-f">
              <FacebookIcon height="24" width="24" color="white" />
            </i>
          </Link>
          <Link
            href="https://twitter.com"
            className="text-gray-800 hover:text-red-600"
          >
            <i className="fab fa-twitter">
              <XIcon height="24" width="24" color="white" />
            </i>
          </Link>
          <Link
            href="https://instagram.com"
            className="text-gray-800 hover:text-red-600"
          >
            <i className="fab fa-instagram">
              <InstagramIcon height="24" width="24" color="white" />
            </i>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleSidebar} className="md:hidden text-white p-2">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 w-64 bg-[#F12E2A] transform transition-transform duration-300 ease-in-out z-50",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button onClick={toggleSidebar} className="text-white p-2">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-white">
            <Link href="/" className="hover:text-gray-200 text-lg">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-200 text-lg">
              About
            </Link>
            <Link href="/blogs" className="hover:text-gray-200 text-lg">
              Blogs
            </Link>
            <Link
              href="/shop-directories"
              className="hover:text-gray-200 text-lg"
            >
              Shop Directories
            </Link>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </nav>
  );
};

export default Navbar;
