// src/app/speaking/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, BookOpen, ChevronRight, X, Loader2, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type SpeakingItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  event_date?: string | null;
  published_at?: string | null;
};

export default function SpeakingPage() {
  const [items, setItems] = useState<SpeakingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<SpeakingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<SpeakingItem | null>(null);

  // Fetch all published speaking items
  useEffect(() => {
    async function fetchSpeaking() {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("speaking_engagements")
        .select("id, title, category, description, event_date, published_at")
        .eq("status", "published")
        .order("event_date", { ascending: false, nullsFirst: false });

      if (error) {
        console.error("Error fetching speaking engagements:", error);
      } else {
        setItems(data || []);
        setFilteredItems(data || []);
      }
      setLoading(false);
    }

    fetchSpeaking();
  }, []);

  // Filter logic: category + search
  useEffect(() => {
    let result = items;

    // Category filter
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Search filter (title or description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    setFilteredItems(result);
  }, [selectedCategory, searchQuery, items]);

  // Unique categories for filter chips
  const categories = Array.from(new Set(items.map(i => i.category)));

  const openModal = (item: SpeakingItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // Demo data (only shown if no real data)
  const demoItem = {
    id: "demo",
    title: "Sample: Walking in Purpose (Devotional)",
    category: "Devotional",
    description:
      "This is a sample entry. In a real database, this section would show actual speaking engagements, teachings, and messages Deborah has delivered. Add items in Supabase to see them here.",
    event_date: "2025-03-15",
    published_at: new Date().toISOString(),
  };

  const showDemo = items.length === 0 && !loading;

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero / Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Speaking & Teachings
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Messages, devotionals, conferences, and sessions delivered to inspire faith, healing, identity, and purpose in the lives of God's people.
          </p>
        </motion.div>

        {/* Search + Category Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages by title or keyword..."
              className="w-full text-black pl-12 pr-4 py-4 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white shadow-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-purple-700 text-white shadow-md"
                  : "bg-white text-black border border-purple-200 hover:bg-purple-50"
              }`}
            >
              All
            </button>

            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-purple-700 text-white shadow-md"
                    : "bg-white text-black border border-purple-200 hover:bg-purple-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-purple-600" size={48} />
          </div>
        ) : filteredItems.length === 0 && !showDemo ? (
          <div className="text-center py-20 text-gray-600">
            No messages match your search or filter. Try another category or clear the search.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showDemo ? [demoItem] : filteredItems).map(item => {
              const shortDesc = item.description.length > 180
                ? item.description.substring(0, 180) + "..."
                : item.description;

               const stripHtml = (html: string | null | undefined): string => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '').trim();
  };

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-md border border-purple-100 hover:shadow-xl hover:border-purple-200 transition-all group cursor-pointer flex flex-col"
                  onClick={() => openModal(item)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="text-purple-700" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {item.event_date ? new Date(item.event_date).toLocaleDateString() : "Ongoing"}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed line-clamp-5 mb-4 flex-1">
                    {stripHtml(shortDesc)}
                  </p>

                  {item.description.length > 180 && (
                    <div className="text-purple-700 font-medium flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                      Read full message <ChevronRight size={18} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Description Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-3 bg-white rounded-full hover:bg-gray-100 transition z-10"
              >
                <X size={28} className="text-gray-800" />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-purple-700" size={28} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedItem.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-2">
                        <Calendar size={20} />
                        {selectedItem.event_date ? new Date(selectedItem.event_date).toLocaleDateString() : "Ongoing"}
                      </span>
                      <span className="px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {selectedItem.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mt-8">
                  {selectedItem.description.split("\n").map((para, i) => (
                    <p key={i} className="mb-6">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}