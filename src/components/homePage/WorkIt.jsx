"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCardOutlined,
  RocketOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  UserAddOutlined,
  HeartOutlined,
  EditOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import useAuthUser from "@/hooks/useAuthUser";

const flows = {
  brand: {
    label: "For brands",
    blurb: "Launch a campaign, pick creators, approve content, and track results.",
    cta: { href: "/auth/singup", text: "Start as a brand" },
    steps: [
      {
        icon: CreditCardOutlined,
        title: "Subscribe",
        text: "Create your brand account and pick a plan that fits your volume.",
      },
      {
        icon: RocketOutlined,
        title: "Create & pay",
        text: "Publish a campaign brief and complete secure Stripe checkout.",
      },
      {
        icon: FileDoneOutlined,
        title: "Accept & approve",
        text: "Accept interested creators, review drafts, approve or request changes.",
      },
      {
        icon: LineChartOutlined,
        title: "Track results",
        text: "Follow campaign status and performance from your brand dashboard.",
      },
    ],
  },
  creator: {
    label: "For creators",
    blurb: "Discover campaigns, submit drafts, earn to your wallet, and withdraw.",
    cta: { href: "/auth/singup", text: "Join as a creator" },
    steps: [
      {
        icon: UserAddOutlined,
        title: "Join & subscribe",
        text: "Build your creator profile and activate a subscription to apply.",
      },
      {
        icon: HeartOutlined,
        title: "Show interest",
        text: "Browse open campaigns and express interest in the right fits.",
      },
      {
        icon: EditOutlined,
        title: "Submit drafts",
        text: "Upload content for brand review — revise if rejected, then ship.",
      },
      {
        icon: WalletOutlined,
        title: "Earn & withdraw",
        text: "Approved work credits your wallet. Withdrawals are admin-reviewed.",
      },
    ],
  },
};

export default function HowItWorks() {
  const [role, setRole] = useState("brand");
  const active = flows[role];
  const { isLoggedIn, hasToken } = useAuthUser();
  const hideSignup = hasToken || isLoggedIn;

  return (
    <section className="relative overflow-hidden border-y border-emerald-100 bg-gradient-to-b from-emerald-50/40 via-white to-white py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Clear steps for brands and creators
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            One platform workflow — from subscription to published campaigns and payouts.
          </p>
        </div>

        <div className="mt-8 inline-flex rounded-full border border-emerald-200 bg-white p-1 shadow-sm">
          {(["brand", "creator"]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRole(key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                role === key
                  ? "bg-[#0b1f17] text-white"
                  : "text-slate-600 hover:text-emerald-800"
              }`}
            >
              {flows[key].label}
            </button>
          ))}
        </div>

        <p
          key={role + "-blurb"}
          className="mt-6 max-w-xl text-sm text-slate-600 animate-[fadeIn_0.4s_ease]"
        >
          {active.blurb}
        </p>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {active.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={`${role}-${step.title}`}
                className="group relative animate-[fadeUp_0.45s_ease_both]"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 transition group-hover:bg-[#0b1f17] group-hover:text-emerald-100">
                    <Icon />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10">
          {hideSignup ? (
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Go to dashboard
            </Link>
          ) : (
            <Link
              href={active.cta.href}
              className="inline-flex h-11 items-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {active.cta.text}
            </Link>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
