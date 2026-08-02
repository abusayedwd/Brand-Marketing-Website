"use client";

import Link from "next/link";
import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const faqItems = [
  {
    key: "1",
    label: "How do I start a campaign as a brand?",
    children:
      "Create a brand account, subscribe to a plan, open Dashboard → Campaigns → Create Campaign, then complete Stripe payment. The campaign moves to upcoming once paid.",
  },
  {
    key: "2",
    label: "When do creators get paid?",
    children:
      "After a brand approves an influencer draft, earnings go to the creator wallet. Withdrawals are submitted by the creator and reviewed by admin before release.",
  },
  {
    key: "3",
    label: "What if my draft is rejected?",
    children:
      "Open the campaign details, read the rejection note, revise your content, and resubmit. You do not need to restart the whole campaign.",
  },
  {
    key: "4",
    label: "Do both brands and creators need a subscription?",
    children:
      "Yes — active plans unlock campaign creation for brands and campaign applications for creators. View current tiers on the Pricing page.",
  },
  {
    key: "5",
    label: "How do I get help if something breaks?",
    children:
      "Use the Support page to send a ticket to the admin team, or email support@brivio.app. Typical reply time is within one business day.",
  },
];

export default function HomeFaq() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Questions teams ask first
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Campaigns, payments, drafts, and support — short answers below.
          </p>
        </div>

        <div className="mt-10">
          <Collapse
            accordion
            bordered={false}
            expandIconPosition="end"
            items={faqItems}
            expandIcon={({ isActive }) => (
              <PlusOutlined
                className={`text-emerald-700 transition-transform duration-200 ${
                  isActive ? "rotate-45" : ""
                }`}
              />
            )}
            className="home-faq bg-transparent"
          />
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Still stuck?{" "}
          <Link href="/support" className="font-semibold text-emerald-800 hover:underline">
            Visit the help center
          </Link>
        </p>
      </div>

      <style jsx global>{`
        .home-faq .ant-collapse-item {
          margin-bottom: 0.75rem;
          border: 1px solid #d1fae5 !important;
          border-radius: 1rem !important;
          background: #fff;
          overflow: hidden;
        }
        .home-faq .ant-collapse-header {
          align-items: center !important;
          padding: 1rem 1.25rem !important;
          font-weight: 600;
          color: #0f172a !important;
        }
        .home-faq .ant-collapse-content-box {
          padding: 0 1.25rem 1.1rem !important;
          color: #64748b;
          font-size: 0.925rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
