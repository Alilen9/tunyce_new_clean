import Image from "next/image";
import React from "react";
import { FaLandmark, FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import {Link} from '@/i18n/navigation';

// This component is the footer for the application.
// It is designed to be professional, clean, and responsive,
// to match the provided image.
export default function FooterPage() {
  return (
    <footer className="w-full bg-[var(--tunyce-maroon)] text-background py-12 px-6 font-inter">
      <div className="container mx-auto max-w-7xl">
        
        {/* Top Section: Brand Logo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-700">
          
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-4">
            <Image
              src="/globe.svg"
              width={34}
              height={34}
              alt="Tunyce Media Logo"
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-white">Tunyce Media</span>
          </div>

        </div>

        {/* Middle Section: Navigation Links and Contact Info */}
        <div className="flex flex-col md:flex-row justify-between gap-8 pt-8">

          {/* Left Side: Navigation Links */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Section 1: Main Links */}
            <div className="flex flex-col gap-2 min-w-[150px] justify-center ">
              <h3 className="text-lg font-semibold text-gray-300">Company</h3>
              <ul className="text-sm space-y-1">
                <li>
                  {/* Use next-intl's Link for locale-aware routing */}
                  <Link href="/about" className="hover:underline text-gray-400 hover:text-white">About Us</Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline text-gray-400 hover:text-white">Careers</Link>
                </li>
                <li>
                  <Link href="/press" className="hover:underline text-gray-400 hover:text-white">Press</Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:underline text-gray-400 hover:text-white">Blog</Link>
                </li>
              </ul>
            </div>
            
            {/* Section 2: Support Links */}
            <div className="flex flex-col gap-2 min-w-[150px]">
              <h3 className="text-lg font-semibold text-gray-300">Support</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <Link href="/help" className="hover:underline text-gray-400 hover:text-white">Help Center</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline text-gray-400 hover:text-white">Contact Us</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline text-gray-400 hover:text-white">FAQs</Link>
                </li>
              </ul>
            </div>

            {/* Section 3: Legal & Policy Links */}
            <div className="flex flex-col gap-2 min-w-[150px]">
              <h3 className="text-lg font-semibold text-gray-300">Legal</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <Link href="/privacy" className="hover:underline text-gray-400 hover:text-white">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline text-gray-400 hover:text-white">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:underline text-gray-400 hover:text-white">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Side: Contact Information */}
          <div className="flex flex-col gap-2 text-sm">
            <h3 className="text-lg font-semibold text-gray-300">Contact Us</h3>
            <p className="flex items-center gap-2">
              <FaLandmark className="text-gray-400" />
              <span>Indigo Suites, Lower Kabete, Nairobi</span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-gray-400" />
              <span>+254 726 813686 / +254 782 755467</span>
            </p>
            <p className="flex items-center gap-2">
              <MdOutlineMail className="text-gray-400" />
              <a href="mailto:info@tunyce.co.ke" className="hover:underline text-gray-400 hover:text-white">
                info@tunyce.co.ke
              </a>
            </p>
          </div>

        </div>

        {/* Bottom Section: Legal and Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Tunyce Media. All rights reserved.</p>
          
        </div>

      </div>
    </footer>
  );
}
