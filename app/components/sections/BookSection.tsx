"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

export default function BookSection() {
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
            They Tried to Rename Us.
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
            <Link
              href="https://craftsandimpressions.com/pages/books"
              className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-12 py-6 rounded-full font-medium text-xl shadow-xl transition-all hover:shadow-purple-500/40"
            >
              <BookOpen className="w-6 h-6" />
              Purchase Your Copy
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}