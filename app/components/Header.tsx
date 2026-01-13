// src/components/Header.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#About" },
    { name: "Book", href: "#Book" },
    { name: "Speaking", href: "#Speaking" },
    { name: "Contact", href: "#Contact  " },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-auto"
      >
        <div 
          className="
            bg-black/30 
            backdrop-blur-xl 
            border border-white/10 
            rounded-full 
            px-8 py-4 
            shadow-2xl 
            shadow-black/40
          "
          style={{
            // Extra glass depth
            background: "rgba(0, 0, 0, 0.25)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          }}
        >
          <ul className="flex items-center gap-10 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    relative px-4 py-2 transition-colors duration-300
                    ${hovered === item.name ? "text-purple-300" : "text-white/90"}
                    hover:text-purple-300
                  `}
                  onMouseEnter={() => setHovered(item.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {item.name}
                  
                  {/* Subtle underline animation on hover */}
                  <span 
                    className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2
                      w-0 h-0.5 bg-purple-400 rounded-full
                      transition-all duration-400
                      ${hovered === item.name ? "w-3/4" : "w-0"}
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </header>
  );
}