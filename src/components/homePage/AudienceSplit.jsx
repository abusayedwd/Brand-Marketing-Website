"use client";

import Link from "next/link";
import {
  ShopOutlined,
  VideoCameraOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import useAuthUser from "@/hooks/useAuthUser";

const audiences = [
  {
    key: "brand",
    icon: ShopOutlined,
    eyebrow: "For brands",
    title: "Run creator campaigns with a clear approval loop",
    text: "Brief the work, accept the right creators, review drafts, and release budget only when content meets your bar.",
    points: [
      "Campaign create + Stripe payment",
      "Accept creators and approve drafts",
      "Dashboard analytics for active work",
    ],
    href: "/auth/singup",
    cta: "Create brand account",
    loggedCta: "Open brand dashboard",
    loggedHref: "/dashboard/campaigns",
  },
  {
    key: "creator",
    icon: VideoCameraOutlined,
    eyebrow: "For creators",
    title: "Find campaigns that fit — get paid for approved work",
    text: "Show interest, submit content, earn to your wallet, and withdraw after admin review. Keep full control of your drafts.",
    points: [
      "Discover and apply to campaigns",
      "Resubmit if a draft needs changes",
      "Wallet earnings + withdraw requests",
    ],
    href: "/influencer",
    cta: "Browse creators & join",
    loggedCta: "Browse open campaigns",
    loggedHref: "/dashboard/campaigns",
  },
];

export default function AudienceSplit() {
  const { isLoggedIn, hasToken } = useAuthUser();
  const hideSignup = hasToken || isLoggedIn;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Who it&apos;s for
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for both sides of every campaign
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Brands get control. Creators get clarity. Everyone follows the same workflow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            const href = hideSignup ? item.loggedHref : item.href;
            const cta = hideSignup ? item.loggedCta : item.cta;
            return (
              <div
                key={item.key}
                className={`relative overflow-hidden rounded-3xl border border-emerald-100 p-7 sm:p-9 ${
                  i === 0
                    ? "bg-[#0b1f17] text-white"
                    : "bg-gradient-to-br from-emerald-50/80 to-white text-slate-900"
                }`}
              >
                <div
                  className={`mb-5 inline-flex rounded-2xl p-3 ${
                    i === 0 ? "bg-white/10 text-emerald-200" : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  <Icon className="text-xl" />
                </div>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                    i === 0 ? "text-emerald-300" : "text-emerald-700"
                  }`}
                >
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">{item.title}</h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    i === 0 ? "text-emerald-50/80" : "text-slate-600"
                  }`}
                >
                  {item.text}
                </p>
                <ul className="mt-6 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className={`flex items-start gap-2 text-sm ${
                        i === 0 ? "text-emerald-100/90" : "text-slate-700"
                      }`}
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          i === 0 ? "bg-emerald-400" : "bg-emerald-600"
                        }`}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition ${
                    i === 0
                      ? "text-emerald-200 hover:text-white"
                      : "text-emerald-800 hover:text-emerald-950"
                  }`}
                >
                  {cta}
                  <ArrowRightOutlined className="text-xs" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
