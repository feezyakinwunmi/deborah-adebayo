"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, MessageSquare, PenTool, LogOut,MessageCircleCode, Menu, X,  } from "lucide-react";
import Link from "next/link";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Blog Posts", href: "/admin/blog", icon: PenTool },
    { name: "Books", href: "/admin/books", icon: BookOpen },
    { name: "Speaking", href: "/admin/speaking", icon: MessageSquare },

    // Add more items later (e.g. testimonials, logout)
    // { name: "Logout", href: "/logout", icon: LogOut },
    {name: "testimonials", href: "/admin/testimonials", icon: MessageCircleCode}
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 bg-purple-700 text-white rounded-full lg:hidden shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className=" fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden"
          >
            <div className="p-6 flex justify-between items-center border-b border-purple-100">
              <h2 className="text-2xl font-serif font-bold text-purple-800">Admin</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-purple-50 rounded-full">
                <X size={24} className="text-gray-700" />
              </button>
            </div>

            <nav className="p-4">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-800 transition-colors"
                >
                  <item.icon size={22} />
                  <span className="text-lg font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="mt-20 hidden lg:block fixed top-0 left-0 h-full w-64 bg-white border-r border-purple-100 shadow-sm">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-2xl font-serif font-bold text-purple-800">Admin Panel</h2>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-800 transition-colors"
            >
              <item.icon size={22} />
              <span className="text-lg font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay when sidebar open on mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}