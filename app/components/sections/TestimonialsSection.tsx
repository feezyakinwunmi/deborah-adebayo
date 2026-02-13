"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { createClient } from "@/lib/supabase/client";
import { Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  platform: string;
  rating: number;
  quote: string;
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, platform, rating, quote")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
        setError("Could not load testimonials");
      } else {
        setTestimonials(data || []);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            {error || "No testimonials available yet. Check back soon!"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            What Readers Are Saying
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hearts touched, stories shared, lives changed — here are some beautiful words from those who've read <em>Names I've Worn</em>.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="testimonials-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <p className="text-gray-700 italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.platform}</p>
                  </div>
                  <div className="flex">{renderStars(item.rating)}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}