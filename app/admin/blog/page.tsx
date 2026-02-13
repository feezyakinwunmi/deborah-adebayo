"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, Loader2, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/server"; // ← only for upload
// @ts-ignore
import { EditorContent, useEditor } from "@tiptap/react";
// @ts-ignore
import StarterKit from "@tiptap/starter-kit";
// @ts-ignore
import Image from "@tiptap/extension-image";
// @ts-ignore
import Dropcursor from "@tiptap/extension-dropcursor";
// @ts-ignore
import Placeholder from "@tiptap/extension-placeholder";
import AdminSidebar from "../../components/AdminSidebar";

import { Database } from '@/types/supabase';
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(""); // local preview
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Dropcursor,
      Placeholder.configure({ placeholder: "Start writing your post..." }),
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) {
        setError("Failed to load posts");
        console.error(error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const openModal = (post?: BlogPost) => {
    if (post) {
      setCurrentPost(post);
      setTitle(post.title);
      setThumbnailUrl(post.thumbnail_url || "");
      setPreviewUrl(post.thumbnail_url || "");
      editor?.commands.setContent(post.content);
    } else {
      setCurrentPost(null);
      setTitle("");
      setThumbnailUrl("");
      setPreviewUrl("");
      editor?.commands.setContent("");
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    // Use admin client for upload (bypasses RLS)
    const { error: uploadError } = await supabaseAdmin.storage
      .from('thumbnails')
      .upload(filePath, file);

    if (uploadError) {
      setError("Image upload failed: " + uploadError.message);
      console.error(uploadError);
      return null;
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('thumbnails')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const handleSave = async () => {
    if (!title || !editor?.getHTML()) {
      setError("Title and content are required");
      return;
    }
    setSaving(true);
    setError(null);

    let finalThumbnail = thumbnailUrl;

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const uploadedUrl = await uploadFile(file);
      if (uploadedUrl) {
        finalThumbnail = uploadedUrl;
      }
    }

    const postData = {
      title,
      slug: title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      excerpt: editor.getText().slice(0, 150) + "...",
      content: editor.getHTML(),
      thumbnail_url: finalThumbnail || null,
      status: "published",
    };

    const supabase: any = createClient();
    try {
      let result;
      if (currentPost) {
        result = await supabase.from("blog_posts").update(postData).eq("id", currentPost.id);
      } else {
        result = await supabase.from("blog_posts").insert([postData]);
      }
      if (result?.error) throw result.error;

      const data = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
      setPosts(data?.data || []);
      window.location.reload(); // auto-refresh
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setError("Save failed: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      setPosts(posts.filter(p => p.id !== id));
      window.location.reload();
    }
  };

  return (
     <div className="flex min-h-screen">
    <AdminSidebar />
      <div className="mt-20 flex-1 ml-0 lg:ml-64 p-6 md:p-10 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Manage Blog Posts</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition shadow-md"
        >
          <Plus size={20} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-purple-600" size={48} />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-6 rounded-xl text-center">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          No blog posts yet. Click "New Post" to create one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-purple-100 hover:shadow-lg transition-all"
            >
              {post.thumbnail_url && (
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      post.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.status === "published" ? "Published" : "Draft"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : "Draft"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => openModal(post)}
                    className="text-purple-700 hover:text-purple-900"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
                {currentPost ? "Edit Blog Post" : "New Blog Post"}
              </h2>

              <div className="space-y-8 text-black">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl text-black border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter post title..."
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Thumbnail (optional)</label>
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition"
                      disabled={saving}
                    >
                      Choose Image
                    </button>

                    {previewUrl && (
                      <div className="mt-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-40 h-40 object-cover rounded-xl border border-purple-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl("");
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="ml-4 text-red-600 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Content *</label>
                  <div className="border border-purple-200 rounded-xl overflow-hidden bg-white min-h-[400px]">
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
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 hover:bg-purple-100 rounded"
                        disabled={saving}
                      >
                        <ImageIcon size={18} />
                      </button>
                    </div>
                    <EditorContent editor={editor} className="p-4 min-h-[300px]" />
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
                    {saving ? "Saving..." : currentPost ? "Update Post" : "Publish Post"}
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

// Helper function for image upload (unchanged)
async function uploadFile(file: File) {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `thumbnails/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('thumbnails')
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return null;
  }

  const { data } = supabase.storage.from('thumbnails').getPublicUrl(filePath);
  return data.publicUrl;
}