"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetContentPageQuery } from "@/redux/fetures/content/content";
import { normalizeRichHtml } from "@/utils/htmlContent";

const links = [
  { href: "/aboutus", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
];

export default function ContentPageView({ contentKey, fallbackTitle }) {
  const pathname = usePathname();
  const { data, isLoading } = useGetContentPageQuery(contentKey);
  const page = data?.data?.attributes;
  const html = useMemo(
    () => normalizeRichHtml(page?.body || ""),
    [page?.body]
  );

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-emerald-100 bg-[#0b1f17] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.28),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
            Brivio
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            {page?.title || fallbackTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-emerald-50/80 sm:text-base">
            Clear policies and information for brands and creators on the platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {links.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-white text-emerald-900"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-emerald-100/80 bg-white p-6 shadow-[0_20px_50px_rgba(6,78,59,0.08)] sm:p-10">
          {isLoading ? (
            <div className="space-y-3 py-10">
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
            </div>
          ) : (
            <div
              className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:leading-relaxed prose-a:text-emerald-700 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{
                __html: html || `<p>${fallbackTitle} coming soon.</p>`,
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
