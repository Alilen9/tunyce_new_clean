
/* src/components/home/FeatureSection.tsx */
"use client";

import { easeOut, motion } from "framer-motion";
import Image from "next/image";

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

const slideUpVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: easeOut, // ✅ use imported easing function
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const image = "/screenshot.png";
export default function FeatureSection() {
  return (
    <section className="py-20 px-8">
      <motion.div
        className="container mx-auto flex flex-col md:flex-row items-center gap-12"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: false, amount: 0.4 }}
      >
        <motion.div className="md:w-1/2" variants={slideInVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge Insights for Your Business
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Stay ahead of the curve with our expertly curated content,
            in-depth analysis, and practical guides tailored specifically
            for small and medium enterprises. We cover everything from
            market trends to digital marketing strategies.
          </p>
        </motion.div>
        <motion.div className="md:w-1/2" variants={slideUpVariants}>
          <Image
            src={image}
            alt="Insights Graphic"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
