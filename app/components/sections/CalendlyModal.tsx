"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type CalendlyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const options = [
    {
      duration: "15 Minutes",
      desc: "Quick media interview or chat",
      link: "https://calendly.com/deborahadebayo/15-min-media-interview-quick-chat",
    },
    {
      duration: "30 Minutes",
      desc: "Deeper conversation or discussion",
      link: "https://calendly.com/deborahadebayo/30min",
    },
    {
      duration: "45 Minutes",
      desc: "Confirmed interview or detailed session",
      link: "https://calendly.com/deborahadebayo/45-min-confirmed-interview-booked-time-slot",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 text-center">
              Book a Conversation
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Choose the time that works best for you
            </p>

            <div className="space-y-6">
              {options.map((option, idx) => (
                <a
                  key={idx}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 rounded-2xl text-center transition shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="text-2xl font-bold mb-1">{option.duration}</div>
                  <div className="text-base opacity-90">{option.desc}</div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}