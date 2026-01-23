"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import CalendlyModal from "./CalendlyModal";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <section  className="relative pt-60 pb-20 md:pb-0 md:pt-0 min-h-screen bg-black text-white overflow-hidden">
      {/* Floating animated shapes (purple tones) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Small floating blobs / particles */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-400/30 rounded-full blur-xl"
          animate={{ x: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              When the World Forgets Your Name,
              <br />
              <span className="text-purple-400">Remember Who You Are.</span>
            </h1>

            <p className="text-lg md:text-2xl font-light opacity-90">
              Deborah Adebayo <br />
              Author of <em>Names I&apos;ve Worn</em> • Speaker • Founder
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
           <div className="relative inline-block" ref={dropdownRef}>
      {/* The main button that toggles the dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-purple-700 transition shadow-xl inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Order the Book
        {/* Arrow icon – rotates when open */}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu – appears below when open */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-purple-100 overflow-hidden z-50">
          <div className="py-2">
            <Link
              href="https://a.co/d/c3jmUUu"
              className="block px-6 py-4 text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition font-medium border-b border-gray-100 last:border-b-0"
              onClick={() => setIsOpen(false)} // close on click
              target="_blank"
              rel="noopener noreferrer"
            >
              Order from Amazon
            </Link>

            <Link
              href="https://selar.com/56f6c61m95" // ← Replace with actual Selar URL
              className="block px-6 py-4 text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition font-medium"
              onClick={() => setIsOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order from Selar
            </Link>
          </div>
        </div>
      )}
    </div>

              <button
                onClick={() => setIsCalendlyOpen(true)}
                className="bg-purple-600 text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-purple-700 transition shadow-xl inline-flex items-center justify-center"
              >
                Book a Call
              </button>

             

            </div>
          </motion.div>

          {/* Right: Image with creative shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="relative flex justify-center md:justify-end"
          >
            {/* The shooting-out shape (asymmetric blob/circle) */}
            <div className="relative w-80 md:w-[500px] h-80 md:h-[500px]">
              {/* Background shape - purple gradient blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-700/40 to-purple-900/20 rounded-[40%_60%_70%_30%_/_60%_40%_70%_40%] blur-xl animate-pulse-slow" />

              {/* Actual photo inside clipped shape */}
              <div className="absolute inset-4 overflow-hidden rounded-[40%_60%_70%_30%_/_60%_40%_70%_40%] border-4 border-purple-500/30 shadow-2xl">
                <Image
                  src="/IMG6.jpg"
                  alt="Deborah Adebayo - Elegant Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Extra glow / extension toward top */}
              <motion.div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-60 bg-gradient-to-t from-transparent to-purple-600/30 rounded-full blur-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-purple-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={32} />
      </motion.div>
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </section>
      
  );
  
}