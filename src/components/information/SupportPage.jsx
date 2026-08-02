"use client";

import Link from "next/link";
import { Button, Form, Input, Select, message } from "antd";
import {
  MailOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useSubmitSupportTicketMutation } from "@/redux/fetures/support/support";

const faqs = [
  {
    q: "How do I start a campaign?",
    a: "Create a brand account, subscribe to a plan, then go to Dashboard → Campaigns → Create Campaign and complete Stripe payment.",
  },
  {
    q: "When do influencers get paid?",
    a: "After a brand approves an influencer draft, the campaign budget is added to the influencer wallet. Withdrawals are reviewed by admin.",
  },
  {
    q: "My draft was rejected. What next?",
    a: "Open the campaign details, revise your content based on the rejection note, and resubmit the draft.",
  },
  {
    q: "How do I reset my password?",
    a: "Use Forgot Password on the login page. We will email a one-time code to verify and reset your password.",
  },
];

export default function SupportPage() {
  const [form] = Form.useForm();
  const [submitTicket, { isLoading: sending }] = useSubmitSupportTicketMutation();

  const onFinish = async (values) => {
    try {
      const res = await submitTicket(values).unwrap();
      if (res?.code === 201 || res?.code === 200) {
        message.success("Support request sent. Our team will reply soon.");
        form.resetFields();
        return;
      }
      message.error(res?.message || "Could not submit. Please try again.");
    } catch (err) {
      message.error(err?.data?.message || "Could not submit. Please try again.");
    }
  };

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-emerald-100 bg-[#0b1f17] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,0.3),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
            Help Center
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            How can we support you today?
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-emerald-50/80 sm:text-base">
            Get help with campaigns, payments, subscriptions, or account issues.
            Our team usually replies within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <MailOutlined />,
              title: "Email support",
              text: "support@brivio.app",
            },
            {
              icon: <ClockCircleOutlined />,
              title: "Response time",
              text: "Within 24 hours (business days)",
            },
            {
              icon: <SafetyOutlined />,
              title: "Account safety",
              text: "Never share OTP or Stripe codes",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_12px_30px_rgba(6,78,59,0.06)]"
            >
              <div className="mb-3 inline-flex rounded-xl bg-emerald-50 p-3 text-lg text-emerald-700">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-3 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <MessageOutlined className="text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Send a message</h2>
            </div>
            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <Form.Item
                  name="name"
                  label="Full name"
                  rules={[{ required: true, message: "Enter your name" }]}
                >
                  <Input size="large" placeholder="Your name" className="!rounded-xl" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Enter your email" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input size="large" placeholder="you@example.com" className="!rounded-xl" />
                </Form.Item>
              </div>
              <Form.Item
                name="topic"
                label="Topic"
                rules={[{ required: true, message: "Select a topic" }]}
              >
                <Select
                  size="large"
                  placeholder="What do you need help with?"
                  className="!rounded-xl"
                  options={[
                    { value: "Campaign", label: "Campaign help" },
                    { value: "Payment", label: "Payment / subscription" },
                    { value: "Withdraw", label: "Wallet / withdraw" },
                    { value: "Account", label: "Account access" },
                    { value: "Other", label: "Other" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: "Write your message" }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Describe your issue…"
                  className="!rounded-xl"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={sending}
                size="large"
                className="!h-11 !rounded-xl !bg-emerald-700 hover:!bg-emerald-600"
              >
                Submit support request
              </Button>
            </Form>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Quick links</h2>
              <div className="mt-4 space-y-2">
                {[
                  ["/pricing", "View pricing plans"],
                  ["/dashboard/campaigns", "Go to campaigns"],
                  ["/privacy", "Privacy policy"],
                  ["/terms", "Terms of use"],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-xl border border-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50/60"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-4">
                {faqs.map((item) => (
                  <div key={item.q}>
                    <p className="text-sm font-semibold text-slate-800">{item.q}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
