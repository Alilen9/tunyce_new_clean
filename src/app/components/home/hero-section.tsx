
/* src/components/home/HeroSection.tsx */
"use client";

import { easeOut, motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut, // ✅ use imported easing function
    },
  },
};


export default function HeroSection() {
  return (
    <section className="relative text-white min-h-[60vh] flex flex-col items-center justify-center p-8 rounded-b-3xl h-screen overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 animate-gradient bg-[length:200%_200%] bg-gradient-to-br from-red-600 via-maroon-600 to-indigo-700 z-0" />

      <motion.div
        className="text-center max-w-4xl z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-12"
          variants={slideInVariants}
        >
          Revolutionizing Urban Advertising.
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-light mb-12"
          variants={slideInVariants}
        >
          Tunyce Media is your go-to platform for the latest news, insights,
          and resources to help your business thrive in a competitive market enabling you to reach millions of commuters in matatus.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="z-10"
      >
        <Link
          href="/login"
          className="bg-tunyce-maroon text-white font-bold px-12 py-4 rounded-full shadow-lg hover:bg-gray-100 hover:text-tunyce-maroon transition-colors duration-300"
        >
          Start Advertising
        </Link>
      </motion.div>

      {/* Add custom animation via Tailwind */}
      <style jsx>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
