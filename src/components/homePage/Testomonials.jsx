"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TestimonialsGrid() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        "Brivio made campaign briefs and draft approvals so much clearer. We closed our first creator collaboration in days, not weeks.",
      name: "Amelia Yates",
      position: "CEO, Archa",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "The workflow from invite to payout is transparent. Our brand visibility jumped and reporting stayed simple for the team.",
      name: "David Smith",
      position: "Marketing Director",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "As a creator, I always know campaign status and when earnings hit my wallet. Draft feedback is fast and specific.",
      name: "Jordan Lee",
      position: "Content Creator",
      rating: 4.5,
    },
    {
      id: 4,
      quote:
        "We renewed after seeing ROI. Subscription, campaigns, and approvals live in one place — that alone saves hours every week.",
      name: "John Miller",
      position: "Brand Manager",
      rating: 5,
    },
  ];

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.round(rating) ? "text-amber-400" : "text-slate-300"}
      >
        ★
      </span>
    ));

  return (
    <section
      className={`border-y border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white py-16 sm:py-20 transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What brands and creators say
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Real feedback from teams running campaigns and creators delivering
            approved content on Brivio.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, index) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-7"
            >
              <div className="mb-3 text-sm">{renderStars(t.rating)}</div>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                “{t.quote}”
              </p>
              <footer className="mt-5 border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.position}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
