"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

export default function BookSection() {

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
    <section id="Book" className="py-24 md:py-32 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-950 text-white relative overflow-hidden">
      {/* Subtle floating purple particles/smoke accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-5xl font-serif font-bold">
            They Tried to Rename Us. <br/>
            <span className="text-purple-300">We Remembered.</span>
          </h2>
          <p className="mt-6 text-xl md:text-xl opacity-90 max-w-4xl mx-auto">
            A revelatory memoir of memory, migration, and matriarchy.
          </p>
        </motion.div>

        {/* Main Book Showcase */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Book Cover - Large & Floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-md md:max-w-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-purple-700/40 rounded-3xl blur-2xl animate-pulse-slow" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-400/30">
              <Image
                src="/IMG9.jpg"
                alt="Namee I've Worn - Book Cover Aesthetic"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Glow extension */}
            <motion.div
              className="absolute -inset-10 bg-gradient-to-t from-transparent to-purple-500/20 blur-3xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </motion.div>

          {/* Synopsis & Takeaways */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-10"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-200 leading-relaxed ">
                What does it mean to be called strong when all you want is to breathe?
              </p>
              <p className="text-gray-200 leading-relaxed">
                In her revelatory memoir, Deborah Adebayo moves across continents and generations to uncover the stories that shape us. From the birthing wards of Philadelphia to the kitchens of Toronto, this is a journey through memory, migration, and matriarchy.
              </p>
              <p className="text-gray-200 leading-relaxed italic">
                It is not just a story of triumph told for applause; it is the holy work of becoming. A record of truths that refused to die and faith that flourished underground.
              </p>
            </div>

            {/* Reader Takeaways - Elegant List */}
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold text-purple-300">Reader Takeaways</h3>
              <ul className="space-y-4">
                {[
                  "The Power of Identity – exploring self-worth in a world that tries to define us.",
                  "Matriarchy and Lineage – honoring the quiet sacrifices of the women who shaped our lives.",
                  "Faith in the Midst of Survival – discovering spiritual clarity amid life’s chaotic transitions."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-200">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
         <div className="relative inline-block" ref={dropdownRef}>
      {/* The main button that toggles the dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-purple-700 transition shadow-xl inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
<BookOpen className="w-6 h-6" />
              Purchase Your Copy 
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}  



