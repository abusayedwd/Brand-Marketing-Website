"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGetFeaturedRatingsQuery } from "@/redux/fetures/ratings/ratings";
import getMediaUrl from "@/utils/getMediaUrl";

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(rating) ? "text-amber-400" : "text-slate-300"}>
      ★
    </span>
  ));

const reviewerLine = (from) => {
  if (!from) return "";
  if (from.role === "brand") return from.companyName ? `Brand · ${from.companyName}` : "Brand";
  return "Content creator";
};

// Real reviews left after campaigns. Hidden entirely until there are some.
export default function TestimonialsGrid() {
  const { data } = useGetFeaturedRatingsQuery(4);
  const reviews = Array.isArray(data?.data?.attributes) ? data.data.attributes : [];

  if (!reviews.length) return null;

  return (
    <section className="border-y border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Reviews
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What brands and creators say
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Reviews left by brands and creators after working together on a campaign.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {reviews.map((r, index) => {
            const from = r.fromUserId;
            return (
              <motion.blockquote
                key={r.id || r._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col rounded-3xl border border-emerald-100 bg-white p-6 sm:p-7"
              >
                <div className="mb-3 text-sm" aria-label={`${r.rating} out of 5 stars`}>
                  {renderStars(r.rating)}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate-700 sm:text-base">
                  “{r.review}”
                </p>
                <footer className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <img
                    src={getMediaUrl(from?.image, "/images/default-avatar.svg")}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {from?.fullName || "Verified user"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {reviewerLine(from)}
                      {r.campaignId?.campaignName ? ` · ${r.campaignId.campaignName}` : ""}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
