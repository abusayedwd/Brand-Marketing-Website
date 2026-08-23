"use client";

import React from "react";
import Link from "next/link";
import {
  BulbOutlined,
  RocketOutlined,
  VideoCameraOutlined,
  LineChartOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const services = [
  {
    icon: BulbOutlined,
    title: "Content strategy",
    description:
      "Brief campaigns with clear goals so creators know exactly what to deliver.",
  },
  {
    icon: RocketOutlined,
    title: "Campaign launch",
    description:
      "Publish, pay with Stripe, and recruit creators into one tracked workflow.",
  },
  {
    icon: VideoCameraOutlined,
    title: "Draft approval",
    description:
      "Review creator drafts, request changes, and approve before anything goes live.",
  },
  {
    icon: LineChartOutlined,
    title: "Results & payouts",
    description:
      "Follow campaign status, wallet earnings, and admin-reviewed withdrawals.",
  },
];

export default function Service() {
  return (
    <section className="border-y border-emerald-100 bg-gradient-to-b from-white to-emerald-50/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            What Brivio does
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A clearer way to run creator campaigns
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Brands and creators share one platform — from subscription and briefs to
            approved content and payouts.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-emerald-100 p-3 text-xl text-emerald-800 transition group-hover:bg-[#0b1f17] group-hover:text-emerald-100">
                  <Icon />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:underline"
          >
            View pricing plans
            <ArrowRightOutlined className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}
