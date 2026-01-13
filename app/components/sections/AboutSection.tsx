"use client";

import { motion } from "framer-motion";
import { Mic2, Brush, Briefcase } from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function AboutSection() {
  return (
    <section id="About" className="py-24 md:py-20 bg-gradient-to-b from-white via-purple-50/50 to-purple-900/10 relative overflow-hidden">
      {/* Subtle purple smoke overlay for whole section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-purple-950/20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Headline - more purple */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Meeting You at the Intersection of{" "}
            <span className="text-purple-700">Grit and Grace</span>
          </h2>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
            Storyteller. Operational Leader. Creative Soul.
          </p>
        </motion.div>

        {/* Three Pillars - stronger purple accents */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-purple-200/50 hover:border-purple-400 hover:shadow-purple-500/20 transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mic2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-purple-800 mb-4">The Speaker</h3>
            <p className="text-gray-700 leading-relaxed">
              Deborah’s voice is a gift offered with intention; it soothes, heals, mends, encourages, and uplifts. Drawing from her debut collection, Names I’ve Worn, she addresses themes of sacred healing, identity & leadership, and faith in the margins.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-purple-200/50 hover:border-purple-400 hover:shadow-purple-500/20 transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brush className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-purple-800 mb-4">The Creative</h3>
            <p className="text-gray-700 leading-relaxed">
              Through Crafts and Impressions, Deborah translates the intangible into the tangible. Art & journaling pieces crafted with intention and prayer, poetry & prose from the quiet places of the heart.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-purple-200/50 hover:border-purple-400 hover:shadow-purple-500/20 transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-purple-800 mb-4">The Professional</h3>
            <p className="text-gray-700 leading-relaxed">
              Blending deep spiritual insight with over a decade of high-level operational leadership. Founder of Anevisas Place Inc. and experienced in operational leadership at Climate Action Network Canada.
            </p>
          </motion.div>
        </div>

        {/* Staggered Image Grid with Smoke Gradient Blend */}
      <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
  

  {/* Floating images with subtle motion - now 5 images */}

  {/* Image 1 - Large left portrait */}
  <motion.div
    className="absolute top-8 left-8 md:left-12 w-72 md:w-[200px] h-96 md:h-[400px] rounded-3xl shadow-2xl overflow-hidden rotate-[-6deg] z-20"
    animate={{ y: [0, -15, 0], rotate: [-6, -8, -6] }}
    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
  >
    <Image
      src="/IMG7.jpg"
      alt="Deborah Adebayo Portrait"
      fill
      className="object-cover"
    />
  </motion.div>

  {/* Image 2 - Large right creative moment */}
  <motion.div
    className="absolute bottom-10 right-8 md:right-16 w-80 md:w-[300px] h-[400px] md:h-[400px] rounded-3xl shadow-2xl overflow-hidden rotate-[7deg] z-30"
    animate={{ y: [0, 20, 0], rotate: [7, 9, 7] }}
    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
  >
    <Image
      src="/IMG1.jpg"
      alt="Creative Work Moment"
      fill
      className="object-cover"
    />
  </motion.div>

  {/* Image 3 - Medium center-top */}
  <motion.div
    className="absolute top-20 left-1/2 -translate-x-1/2 w-56 md:w-[300px] h-72 md:h-[400px] rounded-3xl shadow-xl overflow-hidden rotate-[-2deg] z-25"
    animate={{ scale: [1, 1.06, 1], y: [0, -10, 0] }}
    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
  >
    <Image
      src="/IMG4.jpg"
      alt="Speaking Moment"
      fill
      className="object-cover"
    />
  </motion.div>

  {/* Image 4 - Small bottom-left accent */}
  <motion.div
    className="absolute bottom-16 left-16 md:left-32 w-48 md:w-[300px] h-64 md:h-[400px] rounded-2xl shadow-lg overflow-hidden rotate-[4deg] z-15"
    animate={{ y: [0, 12, 0], rotate: [4, 6, 4] }}
    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 5 }}
  >
    <Image
      src="/IMG2.jpg"
      alt="Professional Portrait"
      fill
      className="object-cover"
    />
  </motion.div>

  {/* Image 5 - Small top-right circle */}
  <motion.div
    className="absolute top-16 right-16 md:right-32 w-40 md:w-[220px] h-40 md:h-[220px] rounded-full overflow-hidden shadow-xl z-35"
    animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
  >
    <Image
      src="/IMG6.jpg"
      alt="Artistic Detail"
      fill
      className="object-cover"
    />
  </motion.div>
</div>
      </div>
    </section>
  );
}