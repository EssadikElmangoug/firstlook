"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm w-full">
      {/* Logo and title on the left */}
      <div className="flex items-center space-x-3">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={50}  
            height={30} 
            priority
          />
        </Link>
        <h1 className="text-2xl font-semibold text-[#776BA2]">First Look</h1>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-between w-7 h-5"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-full bg-gray-800 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-full bg-gray-800 transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`h-0.5 w-full bg-gray-800 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Desktop navigation buttons */}
      <div className="hidden md:flex md:items-center md:space-x-4">
        <Link href="/login" className="cursor-pointer">
          <button className="px-4 py-2 text-[#776BA2] font-medium border border-[#776BA2] rounded-md hover:bg-[#f8f7fc] transition-colors">
            Login
          </button>
        </Link>
        <Link href="/signup" className="cursor-pointer">
          <button className="px-4 py-2 bg-[#776BA2] text-white font-medium rounded-md hover:bg-[#665a91] transition-colors shadow-sm">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 md:hidden z-10">
          <div className="flex flex-col space-y-3">
            <Link href="/login" className="cursor-pointer">
              <button className="w-full px-4 py-2 text-[#776BA2] font-medium border border-[#776BA2] rounded-md hover:bg-[#f8f7fc] transition-colors">
                Login
              </button>
            </Link>
            <Link href="/signup" className="cursor-pointer">
              <button className="w-full px-4 py-2 bg-[#776BA2] text-white font-medium rounded-md hover:bg-[#665a91] transition-colors shadow-sm">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 