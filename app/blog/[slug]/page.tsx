"use client";

import { notFound } from "next/navigation";
import { Calendar, User, Clock, Share2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, use } from "react";

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

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes === 1 ? "1 min read" : `${minutes} min read`;
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        setError(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (error || !post) {
    notFound();
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  const readingTime = estimateReadingTime(post.content);

  return (
    <main className="mt-20 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Back + Share */}
      <div className="max-w-5xl mx-auto px-6 pt-8 md:pt-12 flex justify-between items-center">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-gray-700 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <button
          onClick={async () => {
            const shareData = {
              title: post.title,
              text: post.excerpt || "Read this inspiring message from Deborah Adebayo",
              url: typeof window !== "undefined" ? window.location.href : "",
            };

            try {
              if (navigator.share) {
                await navigator.share(shareData);
              } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
              }
            } catch (err) {
              alert("Couldn't share automatically.");
            }
          }}
          className="flex items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition shadow-md"
        >
          <Share2 size={20} />
          Share
        </button>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-lg">
            <span className="flex items-center gap-2">
              <Calendar size={20} className="text-purple-700" />
              {publishedDate}
            </span>
            <span className="flex items-center gap-2">
              <User size={20} className="text-purple-700" />
              {post.publisher_name || "Deborah Adebayo"}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={20} className="text-purple-700" />
              {readingTime}
            </span>
          </div>
        </header>

        {post.thumbnail_url && (
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl border border-purple-100">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        <div
          className="
          text-black
            prose prose-lg md:prose-xl max-w-none 
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-p:text-gray-800 prose-p:leading-relaxed
            prose-a:text-purple-700 hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-purple-100
            prose-blockquote:border-l-4 prose-blockquote:border-purple-700 prose-blockquote:pl-6 prose-blockquote:italic
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-20 pt-10 border-t border-purple-100 text-center">
          <p className="text-gray-600 mb-6">
            Published by {post.publisher_name || "Deborah Adebayo"} • {publishedDate}
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={async () => {
                const shareData = {
                  title: post.title,
                  text: post.excerpt || "Read this inspiring message",
                  url: typeof window !== "undefined" ? window.location.href : "",
                };

                try {
                  if (navigator.share) {
                    await navigator.share(shareData);
                  } else {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Link copied!");
                  }
                } catch (err) {
                  alert("Couldn't share.");
                }
              }}
              className="flex items-center gap-2 px-8 py-4 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition shadow-md"
            >
              <Share2 size={20} />
              Share this post
            </button>

            <Link
              href="/blog"
              className="flex items-center gap-2 px-8 py-4 border border-purple-300 rounded-xl hover:bg-purple-50 transition"
            >
              Back to all posts
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}