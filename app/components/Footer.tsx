"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-purple-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif font-bold text-purple-800 mb-6">
              Deborah Adebayo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Meeting you at the intersection of Grit, Grace, and Truth. Author, Speaker, and Founder.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1ABWA1SPtA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-2 bg-purple-50 rounded-full text-purple-600 hover:bg-purple-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/thedeborahadebayo?igsh=OWM2cXl5OWkwNWlw&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 bg-purple-50 rounded-full text-purple-600 hover:bg-purple-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="space-y-4">
              {["Home", "About", "Books", "Speaking", "Blog"].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-purple-600" />
                <a href="mailto:info@craftsandimpressions.com" className="hover:text-purple-700">
                  info@craftsandimpressions.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-purple-600" />
                <span>(438) 838-8936</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">Join the community for updates on new releases and events.</p>
            <Link 
              href="/#Contact" 
              className="inline-block bg-purple-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-purple-800 transition shadow-md"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col  justify-center items-center gap-6">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Deborah Adebayo. All rights reserved. <br className="md:hidden" />
            <Link href="https://ithriveonwisdom.com/" className="text-purple-600 hover:underline">Powered by Thriveon</Link>
          </p>
          
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-purple-700">Privacy</Link>
            <Link href="/terms" className="hover:text-purple-700">Terms</Link>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-purple-700 font-medium hover:gap-3 transition-all"
            >
              Back to top <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}