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
  import TestimonialsSection from "./components/sections/TestimonialsSection";
import ReviewFormSection from "./components/sections/ReviewFormSection";
import NoteFormSection from "./components/sections/NoteFormSection";
import ReadSection from "./components/sections/ReadSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AboutSection />
      <BookSection />
      <SpeakingSection />
      <QuoteSection />
      <TestimonialsSection />       
       <ReadSection />

       <div className="flex flex-col md:flex-row  bg-black"> <NoteFormSection />
    <ReviewFormSection /> </div>
     


      <ContactSection />
    

    

    

      {/* Floating CTA - very modern touch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link
          href="https://a.co/d/c3jmUUu"
          className="flex items-center gap-3 bg-primary-600 text-white px-6 py-4 rounded-full shadow-xl hover:bg-primary-700 transition-colors group"
        >
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-600">Order Names I've Worn</span>
        </Link>
      </motion.div>
    </main>
  );
}