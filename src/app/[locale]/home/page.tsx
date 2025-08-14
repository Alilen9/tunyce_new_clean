/* src/app/home/page.tsx */
"use client";

import FeatureSection from "@/app/components/home/feature-section";
import FooterPage from "@/app/components/home/footer";
import HeroSection from "@/app/components/home/hero-section";
import Navbar from "@/app/components/home/navbar";
import ResourceSection from "@/app/components/home/resource-section";
import ScrollButtons from "@/app/components/home/scroll-buttons";
import React from "react";


const inter = { className: "font-inter" };

export default function HomePage() {
  return (
    <div className={`${inter.className} bg-white text-gray-800`}>
      <Navbar />
      <main>
        <HeroSection />
        <ScrollButtons />
        <FeatureSection />
        <ResourceSection />
      </main>
      <FooterPage />
    </div>
  );
}

