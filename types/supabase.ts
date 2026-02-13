// src/types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      publications: {
        Row: {
          id: string;
          title: string;
          slug: string | null;
          description: string | null;
          cover_url: string | null;
          pdf_url: string | null;
          epub_url: string | null;
          purchase_link: string | null;
          published_at: string | null;
          status: 'draft' | 'published';
        };
        Insert: Partial<Database['public']['Tables']['publications']['Row']>;
        Update: Partial<Database['public']['Tables']['publications']['Row']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          thumbnail_url: string | null;
          published_at: string | null;
          status: 'draft' | 'published';
        };
        Insert: Partial<Database['public']['Tables']['blog_posts']['Row']>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Row']>;
      };
      speaking_engagements: {
        Row: {
          id: string;
          title: string;
          slug: string | null;
          category: string;
          event_date: string | null;
          duration_minutes: number | null;
          description: string | null;
          video_url: string | null;
          audio_url: string | null;
          thumbnail_url: string | null;
          published_at: string;
          status: 'draft' | 'published';
        };
        Insert: Partial<Database['public']['Tables']['speaking_engagements']['Row']>;
        Update: Partial<Database['public']['Tables']['speaking_engagements']['Row']>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          platform: string;
          rating: number;
          quote: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['testimonials']['Row']>;
        Update: Partial<Database['public']['Tables']['testimonials']['Row']>;
      };
    };
  };
}