"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const demoTestimonials = [
  {
    text: "Names I've Worn touched my soul in ways I can't explain. It reminded me of my own journey and gave me permission to heal.",
    name: "Aisha O.",
    platform: "Instagram",
  },
  {
    text: "This book is powerful. Every chapter felt like Deborah was speaking directly to me. Highly recommend to every woman seeking truth.",
    name: "Fatima K.",
    platform: "Instagram",
  },
  {
    text: "I cried, I laughed, I healed. Thank you, Deborah, for your honesty and grace.",
    name: "Chinelo N.",
    platform: "WhatsApp Review",
  },
  {
    text: "A masterpiece of vulnerability and strength. It belongs in every woman's library.",
    name: "Zainab M.",
    platform: "Instagram",
  },
  {
    text: "This book gave me language for my pain and hope for my future. Truly life-changing.",
    name: "Anonymous",
    platform: "WhatsApp Review",
  },
];

export default function TestimonialsSection() {
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
          {demoTestimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <p className="text-gray-700 italic leading-relaxed mb-6">
                    "{item.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.platform}</p>
                  </div>
                  <span className="text-purple-500 text-2xl">★ ★ ★ ★ ★</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}