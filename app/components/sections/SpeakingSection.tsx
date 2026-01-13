"use client";

import { motion } from "framer-motion";
import { Mic2, Users, Calendar, Heart } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function SpeakingSection() {
  return (
    <section id="Speaking" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Subtle animated purple smoke/particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"
          animate={{ y: [0, 70, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 22, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold">
            Ignite Your Audience with{" "}
            <span className="text-purple-300">Authentic Storytelling</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl opacity-90 max-w-4xl mx-auto">
            Deborah brings spiritual fire and prose that burns with clarity to every stage.
          </p>
        </motion.div>

        {/* Signature Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              icon: <Heart className="w-10 h-10 text-white" />,
              title: "The Sacred Labor of Healing",
              desc: "Moving beyond 'survival mode' into a life of thriving and worship using faith and resilience strategies.",
            },
            {
              icon: <Users className="w-10 h-10 text-white" />,
              title: "Migration & Memory",
              desc: "The immigrant experience and the complexity of finding 'home' in new lands.",
            },
            {
              icon: <Calendar className="w-10 h-10 text-white" />,
              title: "Women in Leadership",
              desc: "Balancing professional ambition with personal well-being and faith.",
            },
            {
              icon: <Mic2 className="w-10 h-10 text-white" />,
              title: "The Art of Becoming",
              desc: "Embracing the changing seasons of life and the names we wear along the way.",
            },
          ].map((topic, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.15 }}
              className="bg-purple-800/50 backdrop-blur-sm p-8 rounded-3xl border border-purple-600/40 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {topic.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-purple-200 mb-4">{topic.title}</h3>
              <p className="text-gray-200 leading-relaxed">{topic.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Ideal For + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-10"
        >
          <div>
            <h3 className="text-4xl font-serif font-bold text-purple-300 mb-6">Ideal For</h3>
            <ul className="flex flex-wrap justify-center gap-6 text-lg">
              {["Women’s Conferences & Retreats", "Faith-Based Organizations", "Cultural & Heritage Events", "Literary Festivals"].map((item, i) => (
                <li key={i} className="bg-purple-700/40 px-6 py-3 rounded-full border border-purple-500/30">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-4 bg-purple-600 hover:bg-purple-500 text-white px-12 py-6 rounded-full font-medium text-xl shadow-xl transition-all hover:shadow-purple-500/40"
          >
            Book Deborah to Speak
          </Link>
        </motion.div>
      </div>
    </section>
  );
}