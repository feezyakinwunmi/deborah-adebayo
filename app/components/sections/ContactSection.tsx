"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
  try {
console.log("Form submitting this data:", data); // ← MUST see { name: "...", email: "..." }    
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.details || result.error || "Unknown error");
    }

    alert("Success! Check your inbox for the welcome email.");
  } catch (err: any) {
    console.error("Form error:", err);
    alert(`Error: ${err.message}`);
  }
};

  return (
    <section id="Contact" className="py-20 md:py-28 bg-gray-200 text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-6">
       

        {/* Contact Info + Form */}
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        
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

     
      </div>
    </section>
  );
}