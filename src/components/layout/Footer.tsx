import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "../common/icons/facebook-icon";
import XIcon from "../common/icons/x-icon";
import InstagramIcon from "../common/icons/instagram-icons";

const Footer = () => {
  return (
    <footer className="bg-[#F12E2A] text-white py-12">
      <div className="container mx-auto px-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-300">
          <div className="col-span-1 flex items-center justify-center">
            <Image
              src="/images/footer-logo.png"
              alt="Ferrovit Logo"
              width={150}
              height={75}
            />
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-xl mb-4">Heading</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                  amet.
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Email
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Report Adverse Events
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-xl mb-4">Follow Us On</h3>
            <div className="flex flex-row gap-4 items-center justify-start">
              <FacebookIcon height="24" width="24" color="white" />
              <XIcon height="24" width="24" color="white" />
              <InstagramIcon height="24" width="24" color="white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8">
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-200">
                  Lorem Ipsum
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 pb-6 border-t border-gray-300 flex md:flex-row flex-col gap-4 justify-between items-center">
          <p>Copyright © 2023 Ferrovit. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-gray-200">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-gray-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
