"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ReviewFormSection() {
  const [formData, setFormData] = useState({
    review: "",
    recommendTo: "",
    name: "",
    anonymous: false,
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          name: formData.anonymous ? "Anonymous" : formData.name,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! Your review has been sent.");
        setFormData({ review: "", recommendTo: "", name: "", anonymous: false, email: "" });
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to send review. Please try again.");
    }
  };

  return (
    <section className="py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Leave a Review
          </h2>
          <p className="text-xl text-gray-100">
            If <em>Names I've Worn</em> moved you, I'd love to hear what it meant to you. Your review helps other women find the book.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg border border-purple-100"
        >
          <div className="space-y-8">
            {/* Review Textarea */}
            <div>
              <label htmlFor="review" className="block text-lg font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                id="review"
                name="review"
                rows={6}
                value={formData.review}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
                placeholder="What part of the book stayed with you? How did it impact you?"
              />
            </div>

            {/* Recommend To */}
            <div>
              <label htmlFor="recommendTo" className="block text-lg font-medium text-gray-700 mb-2">
                Who would you recommend this book to?
              </label>
              <textarea
                id="recommendTo"
                name="recommendTo"
                rows={3}
                value={formData.recommendTo}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
                placeholder="e.g., My sister, friends going through similar journeys..."
              />
            </div>

            {/* Name & Anonymous */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Name you'd like displayed
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={formData.anonymous}
                  className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition disabled:opacity-50"
                  placeholder="e.g., Aisha O."
                />
              </div>

              <div className="flex items-center pt-10">
                <input
                  id="anonymous"
                  name="anonymous"
                  type="checkbox"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="anonymous" className="ml-3 text-lg text-gray-700">
                  Submit anonymously
                </label>
              </div>
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email (optional – for follow-up only)
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-purple-600 text-white py-5 rounded-full font-medium text-lg hover:bg-purple-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Submit Your Review"}
            </button>

            {/* Status Message */}
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