'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollButtons() {
  const [showButtons, setShowButtons] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 100) {
        setShowButtons(true);
      } else if (currentY < lastScrollY) {
        setShowButtons(true); // scrolling up
      } else {
        setShowButtons(false); // scrolling down
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {showButtons && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md shadow-lg px-12 py-2 flex gap-4 z-50 rounded-xl "
        >
          <div className=" w-full flex flex-row justify-center items-center text-center">
            <Link
              href="/sme"
              className="text-tunyce-maroon font-semibold hover:underline mr-8"
            >
              <button className="bg-tunyce-maroon text-black px-6 py-2 rounded-full hover:bg-gray-100 hover:text-tunyce-maroon transition-colors duration-300 cursor-pointer">
                SMEs&apos;
              </button>
            </Link>
            <Link
              href="/login"
              className="text-tunyce-maroon font-semibold hover:underline"
            >
              <button className="text-black px-6 py-2 rounded-full hover:bg-gray-100 hover:text-tunyce-maroon transition-colors duration-300 cursor-pointer">
                Business
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
