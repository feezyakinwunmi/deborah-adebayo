// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Mic, FileText, Loader2, LogOut, Eye, EyeOff, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "../components/AdminSidebar";

import Link from "next/link";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [stats, setStats] = useState({ books: 0, blogPosts: 0, speaking: 0, testimonials: 0});

  const supabase = createClient();

  // Check auth state
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoadingAuth(false);

      // If logged in, fetch stats
      if (session?.user) {
        fetchStats();
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchStats();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchStats = async () => {
    const [booksRes, blogRes, speakingRes,testimonialRes ] = await Promise.all([
      supabase.from("publications").select("id", { count: "exact" }).eq("status", "published"),
      supabase.from("blog_posts").select("id", { count: "exact" }).eq("status", "published"),
      supabase.from("speaking_engagements").select("id", { count: "exact" }).eq("status", "published"),
      supabase.from("testimonials").select("id", { count: "exact" }).eq("status", "published"),

    ]);

    setStats({
      books: booksRes.count || 0,
      blogPosts: blogRes.count || 0,
      speaking: speakingRes.count || 0,
      testimonials: testimonialRes.count || 0,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message || "Invalid credentials");
    } else {
      // Session updates automatically via listener
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Listener will clear user state
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (!user) {
    // Show login form
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-6">
        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl border border-purple-100 max-w-md w-full">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2 text-center">
            Admin Login
          </h1>
          <p className="text-gray-600 text-center mb-10">
            Sign in to manage content
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full text-black px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-black px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-gray-500 hover:text-purple-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {loginError && <p className="text-red-600 text-center">{loginError}</p>}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-800 transition disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loginLoading && <Loader2 className="animate-spin" size={20} />}
              {loginLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Protected area – only authorized users allowed
          </p>
        </div>
      </div>
    );
  }

  // Logged-in Dashboard
  return (
    <div className="mt-20 p-6 md:p-10 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
        >
          Admin Dashboard
        </motion.h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-8">
        <Link href="/admin/books">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:border-purple-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="text-purple-700" size={40} />
              <span className="text-5xl font-bold text-purple-700">{stats.books}</span> {/* Replace with real stats */}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Book Publications</h3>
            <p className="text-gray-600 mt-2">Manage books & writings</p>
          </motion.div>
        </Link>

        <Link href="/admin/blog">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:border-purple-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="text-purple-700" size={40} />
              <span className="text-5xl font-bold text-purple-700">{stats.blogPosts}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Blog Posts</h3>
            <p className="text-gray-600 mt-2">Articles & devotionals</p>
          </motion.div>
        </Link>

        <Link href="/admin/speaking">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:border-purple-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <Mic className="text-purple-700" size={40} />
              <span className="text-5xl font-bold text-purple-700">{stats.speaking}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Speaking</h3>
            <p className="text-gray-600 mt-2">Messages & sessions</p>
          </motion.div>
        </Link>
                {/* testimonial */}
        <Link href="/admin/testimonials">
        <motion.div
          whileHover={{ scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:border-purple-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <User className="text-purple-700" size={40} />
              <span className="text-5xl font-bold text-purple-700">{stats.testimonials}</span>
            </div>
            
                <h3 className="text-2xl font-bold text-gray-900">Testimonials</h3>
                <p className="text-gray-600 mt-2">Customer testimonials</p>

          </motion.div>
          </Link>




      </div>

      <p className="text-center text-gray-600 mt-12">
        Select a section above to manage content.
      </p>
    </div>
  );
}