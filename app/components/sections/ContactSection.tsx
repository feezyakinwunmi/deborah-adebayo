"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

 const onSubmit = async (data: FormData) => {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    alert("Subscribed! Check your email.");
  } else {
    alert("Error subscribing.");
  }
};

  return (
    <section id="Contact" className="py-20 md:py-28 bg-gray-200 text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Let’s Connect
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            For book inquiries, speaking engagements, or collaborations.
          </p>
        </motion.div>

        {/* Contact Info + Form */}
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href="mailto:info@craftsandimpressions.com" className="text-lg font-medium hover:text-purple-700 transition">
                  info@craftsandimpressions.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Phone className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-medium">(438) 838-8936</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-3">Follow the Journey</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-purple-600 transition">
                  <Facebook className="w-8 h-8" />
                </a>
                <a href="#" className="hover:text-purple-600 transition">
                  <Instagram className="w-8 h-8" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
          >
            <h3 className="text-2xl font-serif font-bold mb-6 text-center">
              Join the Journey
            </h3>
            <p className="text-center text-gray-600 mb-8">
              Subscribe for updates, free chapter downloads, and more.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...register("name")}
                  placeholder="Your Name"
                  className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-4 rounded-full font-medium text-lg hover:bg-purple-700 transition shadow-md disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Subscribe Now"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Copyright Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 pt-10 border-t border-gray-200 text-gray-500 text-sm"
        >
          © 2024 Deborah Adebayo. Powered by Anevisas Place Inc.
        </motion.div>
      </div>
    </section>
  );
}