"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Variants } from "framer-motion";
const fadeIn = {
  hidden: { opacity: 0, scale: 0.95, transition: { duration: 0.01 } }, // Add a dummy transition
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

export default function QuoteSection() {
  return (
    <section id="Quote" className="py-10 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Subtle luxury accents - soft gold/beige waves */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={fadeIn as Variants}
          className="max-w-5xl mx-auto text-center space-y-12"
        >
          {/* Decorative quote icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-md">
              <Quote className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          {/* Main Quote - large & elegant */}
          <blockquote className="text-3xl md:text-4xl font-serif font-medium leading-relaxed text-gray-800 italic">
            "This is a book shaped by memory, migration, matriarchy, and the sacred labor of healing...<br />
            <span className="text-purple-700 not-italic">A record of truths that refused to die."</span>
          </blockquote>

          {/* Attribution */}
          <p className="text-xl md:text-xl text-gray-600 font-medium">
            — From <em className="text-purple-600">Names I've Worn</em>
          </p>

          {/* Subtle decorative underline */}
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}