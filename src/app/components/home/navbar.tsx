"use client";
import { useState } from 'react';
import Image from "next/image";
import { Link } from '@/i18n/navigation';
import { FaArrowAltCircleRight } from 'react-icons/fa';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const logoImage = "/globe.svg";

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-full bg-primary text-foreground p-4 navbar-shadow border-b border-[var(--tunyce-maroon-light)]">
            <nav className="container mx-auto flex justify-between items-center">
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link href="/" className="text-2xl font-bold hover:underline">
                            <Image
                                src={logoImage}
                                width={34}
                                height={34}
                                alt={"LogoImage"}
                            />
                        </Link>
                    </li>

                    {/* The new "Advertise" dropdown menu item */}
                    <li className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center text-lg font-medium hover:text-[var(--tunyce-maroon)] transition-colors duration-200 cursor-pointer"
                        >
                            Advertise
                            <svg
                                className={`w-4 h-4 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 z-50 mt-8 min-w-max bg-white text-gray-800 rounded-lg shadow-lg p-6 grid grid-cols-3 gap-8">
                                {/* First column of the dropdown */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4 border-b pb-2">For Businesses</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/sme" className="block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <div className="font-semibold">SME Advertising</div>
                                                <p className="text-sm text-gray-500">Reach a wide audience with targeted ads.</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/business" className="block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <div className="font-semibold">Corporate Solutions</div>
                                                <p className="text-sm text-gray-500">Tailored marketing strategies for large enterprises.</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/promote-event" className="block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <div className="font-semibold">Event Promotion</div>
                                                <p className="text-sm text-gray-500">Amplify your event to a global audience.</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Second column of the dropdown */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4 border-b pb-2">Other Services</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/partnerships" className="block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <div className="font-semibold">Partnerships</div>
                                                <p className="text-sm text-gray-500">Explore collaboration opportunities with us.</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/advertise" className="block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <div className="font-semibold">General Advertising</div>
                                                <p className="text-sm text-gray-500">Classic ad placement for all your needs.</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                {/* Third column of the dropdown */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4 border-b pb-2">Help</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="https://help.tunycemedia.com/" className="block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <div className="font-semibold">Uploading an Advert</div>
                                                <p className="text-sm text-gray-500 flex">Explore ways of how to upload an advert <FaArrowAltCircleRight className='ml-4' /></p>
                                            </Link>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        )}
                    </li>
                    <li>
                        <Link href="/about" className="text-lg font-medium hover:text-[var(--tunyce-maroon)] transition-colors duration-200">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="text-lg font-medium hover:text-[var(--tunyce-maroon)] transition-colors duration-200">
                            Contact
                        </Link>
                    </li>
                </ul>

                <ul className="flex space-x-4">
                    <li>
                        <button className="border border-[var(--tunyce-maroon)] text-black hover:text-[var(--tunyce-maroon)] rounded-full px-4 py-2 hover:bg-tunyce-maroon hover:text-tunyce-maroon transition-colors cursor-pointer">
                            <Link href="/dashboard" className="text-lg font-medium">
                                Login
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className="bg-[var(--tunyce-maroon)] border border-[var(--tunyce-maroon)] text-white rounded-full px-4 py-2 hover:border-black transition-colors cursor-pointer">
                            Sign Up
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
