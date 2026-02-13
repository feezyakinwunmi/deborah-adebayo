"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, Loader2, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
// @ts-ignore
import { EditorContent, useEditor } from "@tiptap/react";
// @ts-ignore
import StarterKit from "@tiptap/starter-kit";
// @ts-ignore
import Dropcursor from "@tiptap/extension-dropcursor";
// @ts-ignore
import Placeholder from "@tiptap/extension-placeholder";
import AdminSidebar from "../../components/AdminSidebar";


export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("5");
  const [quote, setQuote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase: any = createClient();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Dropcursor,
      Placeholder.configure({ placeholder: "Write the testimonial quote..." }),
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load testimonials");
        console.error(error);
      } else {
        setTestimonials(data || []);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  const openModal = (testimonial?: any) => {
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setName(testimonial.name);
      setPlatform(testimonial.platform);
      setRating(testimonial.rating.toString());
      setQuote(testimonial.quote);
      editor?.commands.setContent(testimonial.quote);
    } else {
      setCurrentTestimonial(null);
      setName("");
      setPlatform("");
      setRating("5");
      setQuote("");
      editor?.commands.setContent("");
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleSave = async () => {
    if (!name || !platform || !quote || !editor?.getHTML()) {
      setError("Name, platform, rating, and quote are required");
      return;
    }

    setSaving(true);
    setError(null);

    const testimonialData = {
      name,
      platform,
      rating: parseInt(rating),
      quote: editor?.getHTML() || quote,
    };

    try {
      let result;
      if (currentTestimonial) {
        result = await supabase.from("testimonials").update(testimonialData).eq("id", currentTestimonial.id);
      } else {
        result = await supabase.from("testimonials").insert([testimonialData]);
      }

      if (result?.error) throw result.error;

      // Refresh list
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      setTestimonials(data?.data || []);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setError("Save failed: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const renderStars = (num: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < num ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="flex min-h-screen">
  <AdminSidebar />
    <div className="mt-20 flex-1 ml-0 lg:ml-64 p-6 md:p-10 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Manage Testimonials</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition shadow-md"
        >
          <Plus size={20} /> New Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-purple-600" size={48} />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-6 rounded-xl text-center">{error}</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          No testimonials yet. Click "New Testimonial" to add one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(test => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-purple-100 hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">{renderStars(test.rating)}</div>
                <span className="text-sm text-gray-600">• {test.platform}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {test.name}
              </h3>

              <p className="text-gray-700 line-clamp-4 mb-4">
                {test.quote.replace(/<[^>]*>/g, '')} {/* Strip HTML for preview */}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => openModal(test)}
                  className="text-purple-700 hover:text-purple-900"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white rounded-full hover:bg-gray-100 transition"
            >
              <X size={28} className="text-gray-800" />
            </button>

            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                {currentTestimonial ? "Edit Testimonial" : "New Testimonial"}
              </h2>

              <div className="space-y-8 text-black">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full text-black px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="John Doe"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Platform (e.g. Google, Facebook) *</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    className="w-full text-black px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Google Review"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Rating (1-5) *</label>
                  <select
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    className="w-full text-black px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={saving}
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quote / Testimonial *</label>
                  <div className="border border-purple-200 rounded-xl overflow-hidden bg-white min-h-[300px]">
                    <div className="flex gap-2 p-3 border-b bg-purple-50">
                      <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className="p-2 hover:bg-purple-100 rounded"
                        disabled={saving}
                      >
                        <strong>B</strong>
                      </button>
                      <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className="p-2 hover:bg-purple-100 rounded"
                        disabled={saving}
                      >
                        <em>I</em>
                      </button>
                      <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        className="p-2 hover:bg-purple-100 rounded"
                        disabled={saving}
                      >
                        H1
                      </button>
                    </div>
                    <EditorContent editor={editor} className="p-4 min-h-[200px]" />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-3 px-8 py-4 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {saving ? "Saving..." : currentTestimonial ? "Update Testimonial" : "Add Testimonial"}
                  </button>
                </div>

                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}