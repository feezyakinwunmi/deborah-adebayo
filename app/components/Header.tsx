"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#About" },
    { name: "Book", href: "#Book" },
    { name: "Speaking", href: "#Speaking" },
    { name: "Contact", href: "#Contact" },
  ];

  return (
    <>
      {/* Main Header - Centered pill on all screens */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-6 md:gap-12">
          {/* Site Name - Always centered in pill on mobile */}
          <motion.div
            className="
              bg-black/30 backdrop-blur-xl border border-white/10 
              rounded-full px-6 py-3 shadow-2xl text-white font-serif 
              text-lg md:text-xl font-bold tracking-wide
            "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Deborah Adebayo
          </motion.div>

          {/* Desktop Nav - Hidden on mobile */}
          <nav className="hidden md:block">
            <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl">
              <ul className="flex items-center gap-10 text-sm font-medium">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="relative px-4 py-2 text-white/90 hover:text-purple-300 transition-colors"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-purple-400 rounded-full transition-all duration-400 group-hover:w-3/4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Mobile Burger Button - Only visible on mobile */}
          <button
            className="md:hidden pointer-events-auto p-3 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full text-white shadow-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-4/5 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              

              <ul className="space-y-6 text-center">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block text-xl text-white/90 hover:text-purple-300 transition-colors py-3"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}