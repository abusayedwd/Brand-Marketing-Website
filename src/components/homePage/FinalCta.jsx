"use client";

import Link from "next/link";
import useAuthUser from "@/hooks/useAuthUser";

export default function FinalCta() {
  const { isLoggedIn, role, hasToken } = useAuthUser();
  const showLoggedInCtas = hasToken || isLoggedIn;

  return (
    <section className="relative overflow-hidden bg-[#0b1f17] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.28),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {showLoggedInCtas ? "Continue" : "Get started"}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {showLoggedInCtas
              ? "Pick up where you left off"
              : "Ready to run your next creator campaign?"}
          </h2>
          <p className="mt-3 text-sm text-emerald-50/75 sm:text-base">
            {showLoggedInCtas
              ? role === "influencer"
                ? "Browse open campaigns, submit drafts, and track earnings from your dashboard."
                : "Manage campaigns, review drafts, and track results from your dashboard."
              : "Join as a brand to launch paid campaigns — or as a creator to earn from approved work."}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {showLoggedInCtas ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-[#0b1f17] transition hover:bg-emerald-400"
              >
                Go to dashboard
              </Link>
              <Link
                href="/dashboard/campaigns"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View campaigns
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/singup"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-[#0b1f17] transition hover:bg-emerald-400"
              >
                Start as a brand
              </Link>
              <Link
                href="/auth/singup"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Join as a creator
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
