"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, BookOpen, Loader2, ArrowRight, Search, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Book = {
  id: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  cover_url?: string | null;
  published_at?: string | null;
  publisher_name?: string | null;
  pdf_url?: string | null;
  epub_url?: string | null;
  purchase_link?: string | null;
  status: "draft" | "published";
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Books fetch error:", error);
      } else if (data) {
        setBooks(data);
      }
      setLoading(false);
    }

    fetchBooks();
  }, []);

  // Filter books by search
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Strip HTML tags → plain text only
  const stripHtml = (html: string | null | undefined): string => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '').trim();
  };

  // Shorten description for grid (150 chars)
  const shortDesc = (desc: string | null | undefined): string => {
    const plain = stripHtml(desc);
    return plain.length > 150 ? plain.substring(0, 150) + "..." : plain;
  };

  const openModal = (book: Book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Books & Publications
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Inspiring, faith-filled books written to bring healing, hope, and spiritual growth.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search books by title or description..."
            className="w-full pl-12 pr-4 py-4 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm"
          />
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group border border-purple-100 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                      <BookOpen className="text-purple-600" size={48} />
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <Calendar size={16} />
                    {book.published_at
                      ? new Date(book.published_at).toLocaleDateString()
                      : "Recent"}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                    {book.title}
                  </h3>

                  <div className="text-gray-600 line-clamp-4 mb-4 flex-1">
                    {shortDesc(book.description) || "A powerful message of faith and purpose..."}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3">
                    {book.pdf_url && (
                      <a
                        href={book.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition text-sm"
                      >
                        PDF
                      </a>
                    )}
                    {book.epub_url && (
                      <a
                        href={book.epub_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50 transition text-sm"
                      >
Amazone                      </a>
                    )}
                    {book.purchase_link && (
                      <a
                        href={book.purchase_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition text-sm"
                      >
                        selar
                      </a>
                    )}
                    {book.description && stripHtml(book.description).length > 150 && (
                      <button
                        onClick={() => openModal(book)}
                        className="text-purple-700 hover:text-purple-900 text-sm font-medium flex items-center gap-1"
                      >
                        Read more <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 py-20">
              No books found matching your search.
            </p>
          )}
        </div>

        {books.length === 0 && !loading && (
          <p className="text-center text-gray-600 py-20">
            No books published yet. Check back soon!
          </p>
        )}
      </div>

      {/* Read More Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl p-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} className="text-gray-700" />
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedBook.title}</h2>

            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {stripHtml(selectedBook.description) || "No description available."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {selectedBook.pdf_url && (
                <a
                  href={selectedBook.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition"
                >
                  Download PDF
                </a>
              )}
              {selectedBook.epub_url && (
                <a
                  href={selectedBook.epub_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-purple-700 text-purple-700 rounded-xl hover:bg-purple-50 transition"
                >
                  Download EPUB
                </a>
              )}
              {selectedBook.purchase_link && (
                <a
                  href={selectedBook.purchase_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-purple-100 text-purple-800 rounded-xl hover:bg-purple-200 transition"
                >
                  Buy Now
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}