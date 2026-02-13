// src/app/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, Clock, Search, Loader2, ArrowRight, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  thumbnail_url?: string | null;
  published_at?: string | null;
  publisher_name?: string | null;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Blog fetch error:", error);
      } else if (data && data.length > 0) {
        setPosts(data);
        setFeaturedPost(data[0]);

        // Debug: log thumbnail URLs to console
        data.forEach((post: BlogPost) => {
          if (post.thumbnail_url) {
            console.log(`Post "${post.title}": ${post.thumbnail_url}`);
          } else {
            console.log(`Post "${post.title}": no thumbnail`);
          }
        });
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  // Filter posts by search
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Blog & Teachings
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Insights, devotionals, reflections, and messages to inspire faith, healing, and purpose.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-4 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm"
          />
        </div>

        {/* Featured Post */}
        {featuredPost && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-purple-100 hover:shadow-purple-200/50 transition-all group">
                <div className="relative h-64 md:h-96 overflow-hidden">
                  {featuredPost.thumbnail_url ? (
                    <img
                      src={featuredPost.thumbnail_url}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        console.error("Featured image failed");
                        e.currentTarget.src = "https://placehold.co/1200x800/purple/white?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                      <ImageIcon size={64} className="text-purple-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <Calendar size={18} />
                    {featuredPost.published_at
                      ? new Date(featuredPost.published_at).toLocaleDateString()
                      : "Recent"}
                    <span>•</span>
                    <User size={18} />
                    {featuredPost.publisher_name || "Deborah Adebayo"}
                  </div>

                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 group-hover:text-purple-700 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-lg text-gray-700 line-clamp-3 mb-6">
                    {featuredPost.excerpt || featuredPost.content.substring(0, 200) + "..."}
                  </p>

                  <div className="text-purple-700 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read full article <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts
            .filter(p => p.id !== featuredPost?.id || searchQuery)
            .map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group border border-purple-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          console.error("Grid image failed");
                          e.currentTarget.src = "https://placehold.co/600x400/purple/white?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                        <ImageIcon size={48} className="text-purple-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <Calendar size={16} />
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : "Recent"}
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {post.publisher_name || "Deborah Adebayo"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>

                    <div className="text-purple-700 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read more <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
        </div>

        {filteredPosts.length === 0 && !loading && (
          <p className="text-center text-gray-600 py-20">
            No articles found matching your search.
          </p>
        )}
      </div>
    </main>
  );
}