"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NoteFormSection() {
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/submit-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! Your note has been sent to Deborah.");
        setFormData({ message: "", name: "", email: "" });
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to send note. Please try again.");
    }
  };

  return (
    <section className="py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Share a Note for Deborah
          </h2>
          <p className="text-xl text-gray-100">
            A few words from the heart — whether it's gratitude, a reflection, or something the book stirred in you.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-purple-100"
        >
          <div className="space-y-8">
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                Your Note / Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={7}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
                placeholder="What would you like to say to Deborah? Share your thoughts, feelings, or a memory the book brought up..."
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Your Name (optional)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                placeholder="e.g., Aisha (or leave blank for anonymous)"
              />
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email (optional – if you'd like a reply)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-purple-600 text-white py-5 rounded-full font-medium text-lg hover:bg-purple-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Your Note"}
            </button>

            {/* Feedback */}
            {status === "success" && (
              <p className="text-green-600 text-center font-medium mt-4">{message}</p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-center font-medium mt-4">{message}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}