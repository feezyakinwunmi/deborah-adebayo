
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, Loader2 } from "lucide-react";
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


export default function AdminSpeaking() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase: any = createClient();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Dropcursor,
      Placeholder.configure({ placeholder: "Describe the message or session..." }),
    ],
    content: "",
        immediatelyRender: false,

  });

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const { data, error } = await supabase
        .from("speaking_engagements")
        .select("*")
        .order("event_date", { ascending: false });

      if (error) {
        setError("Failed to load speaking engagements");
        console.error(error);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    }

    fetchItems();
  }, []);

  const openModal = (item?: any) => {
    if (item) {
      setCurrentItem(item);
      setTitle(item.title);
      setCategory(item.category);
      setEventDate(item.event_date || "");
      setDuration(item.duration_minutes?.toString() || "");
      setDescription(item.description || "");
      setVideoUrl(item.video_url || "");
      editor?.commands.setContent(item.description || "");
    } else {
      setCurrentItem(null);
      setTitle("");
      setCategory("");
      setEventDate("");
      setDuration("");
      setDescription("");
      setVideoUrl("");
      editor?.commands.setContent("");
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleSave = async () => {
    if (!title || !category) {
      setError("Title and category are required");
      return;
    }

    setSaving(true);
    setError(null);

    const itemData = {
      title,
      slug: title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      category,
      event_date: eventDate || null,
      duration_minutes: duration ? parseInt(duration) : null,
      description: editor?.getHTML() || description,
      video_url: videoUrl || null,
      status: "published",
    };

    try {
      let result;
      if (currentItem) {
        result = await supabase.from("speaking_engagements").update(itemData).eq("id", currentItem.id);
      } else {
        result = await supabase.from("speaking_engagements").insert([itemData]);
      }

      if (result?.error) throw result.error;

      const { data } = await supabase
        .from("speaking_engagements")
        .select("*")
        .order("event_date", { ascending: false });

      setItems(data?.data || []);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setError("Save failed: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this speaking engagement?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("speaking_engagements").delete().eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
      <div className="flex min-h-screen">
     <AdminSidebar />
       <div className="mt-20 flex-1 ml-0 lg:ml-64 p-6 md:p-10 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Manage Speaking Engagements</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition shadow-md"
        >
          <Plus size={20} /> New Message
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-purple-600" size={48} />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-6 rounded-xl text-center">{error}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          No speaking engagements yet. Click "New Message" to add one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-purple-100 hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status === "published" ? "Published" : "Draft"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.event_date
                      ? new Date(item.event_date).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-purple-700 mb-2">
                  {item.category}
                </p>

                {item.duration_minutes && (
                  <p className="text-sm text-gray-600 mb-4">
                    Duration: {item.duration_minutes} min
                  </p>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => openModal(item)}
                    className="text-purple-700 hover:text-purple-900"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
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
                {currentItem ? "Edit Speaking Engagement" : "New Speaking Engagement"}
              </h2>

              <div className="space-y-8 text-black">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter message title..."
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Category *</label>
                  <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Devotional, Conference, Podcast, etc."
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Event Date (optional)</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Duration (minutes, optional)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="45"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Video URL (optional)</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="YouTube / Vimeo link..."
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description / Notes</label>
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
                    {saving ? "Saving..." : currentItem ? "Update Engagement" : "Add Engagement"}
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