"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Mic2, Heart, Mail, Instagram, Facebook } from "lucide-react";

import HeroSection from "./components/sections/HeroSection";
 import AboutSection from "./components/sections/AboutSection";
import BookSection from "./components/sections/BookSection";
 import SpeakingSection from "./components/sections/SpeakingSection";
 import QuoteSection from "./components/sections/QuoteSection";
  import ContactSection from "./components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AboutSection />
      <BookSection />
      <SpeakingSection />
      <QuoteSection />
      <ContactSection />
    

    

    

      {/* Floating CTA - very modern touch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link
          href="https://craftsandimpressions.com/pages/books"
          className="flex items-center gap-3 bg-primary-600 text-white px-6 py-4 rounded-full shadow-xl hover:bg-primary-700 transition-colors group"
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">Order Names I've Worn</span>
        </Link>
      </motion.div>
    </main>
  );
}