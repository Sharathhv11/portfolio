"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveDotGrid from "@/components/InteractiveDotGrid";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Full-screen dot grid background — covers navbar + all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <InteractiveDotGrid />
      </div>
      <Navbar />
      <Hero />
    </motion.main>
  );
}
