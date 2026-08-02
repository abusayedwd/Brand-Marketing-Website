"use client";

import {
  LockOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const items = [
  {
    icon: LockOutlined,
    title: "Stripe payments",
    text: "Campaign and subscription checkout run through Stripe — no card details stored on Brivio.",
  },
  {
    icon: CheckCircleOutlined,
    title: "Draft approval loop",
    text: "Creators submit content; brands approve or reject with notes before anything goes live.",
  },
  {
    icon: AuditOutlined,
    title: "Admin withdraw review",
    text: "Wallet withdrawals are held for admin decision so payouts stay accountable.",
  },
  {
    icon: SafetyCertificateOutlined,
    title: "Account safety",
    text: "OTP password reset, role-based access, and moderation tools for suspicious accounts.",
  },
];

export default function TrustSecurity() {
  return (
    <section className="relative overflow-hidden bg-[#0b1f17] py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.22),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Trust & security
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Controls built into the workflow
          </h2>
          <p className="mt-3 text-sm text-emerald-50/75 sm:text-base">
            Payments, content approval, and payouts are designed so brands and creators stay protected.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="animate-[fadeUp_0.5s_ease_both]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-emerald-300">
                  <Icon className="text-xl" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-50/70">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
