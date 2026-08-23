"use client";

import React from "react";
import { Spin, Tag, Image } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  UserOutlined,
  ShopOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import { useGetMyCompletedCampaignsQuery } from "@/redux/fetures/campaign/getMyCompletedCampaigns";
import getMediaUrl from "@/utils/getMediaUrl";

const Field = ({ label, children }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    <div className="mt-1 text-sm font-medium text-slate-800">{children || "—"}</div>
  </div>
);

const Profile = () => {
  const router = useRouter();
  const { data: profile, isLoading } = useLogedUserQuery();
  const user = profile?.data?.attributes;
  const isInfluencer = user?.role === "influencer";

  const { data: completedData } = useGetMyCompletedCampaignsQuery(undefined, {
    skip: !isInfluencer,
  });
  const completedCampaigns = completedData?.data?.attributes?.results || [];
  const completedCount =
    user?.completedCampaignsCount ?? completedCampaigns.length;

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const avatarSrc = getMediaUrl(user?.image);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0b1f17] px-6 py-8 text-white sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(16,185,129,0.28),transparent_45%)]" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-400/30 shadow-lg">
              <Image
                width={96}
                height={96}
                src={avatarSrc}
                alt={user.fullName}
                className="!object-cover"
                preview={{ mask: "View" }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                My profile
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {user.fullName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold capitalize text-emerald-100">
                  {isInfluencer ? <VideoCameraOutlined /> : <ShopOutlined />}
                  {user.role}
                </span>
                {user.userName && (
                  <span className="text-sm text-emerald-100/70">@{user.userName}</span>
                )}
                {user.isEmailVerified && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                    <CheckCircleOutlined /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push("/dashboard/profile/editProfile")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-[#0b1f17] transition hover:bg-emerald-400"
          >
            <EditOutlined />
            Edit profile
          </button>
        </div>
      </section>

      {/* Contact + account */}
      <section className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">Account details</h2>
        <p className="mt-1 text-sm text-slate-500">How brands and creators see you on Brivio</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="flex gap-3">
            <MailOutlined className="mt-0.5 text-emerald-700" />
            <Field label="Email">{user.email}</Field>
          </div>
          <div className="flex gap-3">
            <PhoneOutlined className="mt-0.5 text-emerald-700" />
            <Field label="Phone">{user.phoneNumber}</Field>
          </div>
          <div className="flex gap-3">
            <EnvironmentOutlined className="mt-0.5 text-emerald-700" />
            <Field label="Address">{user.address}</Field>
          </div>
          <div className="flex gap-3">
            <UserOutlined className="mt-0.5 text-emerald-700" />
            <Field label="Date of birth">
              {user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString()
                : null}
            </Field>
          </div>
        </div>
      </section>

      {/* Role-specific */}
      {isInfluencer ? (
        <section className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Creator profile</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {user.bio || "No bio added yet."}
          </p>

          {user.interests?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Interests
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user.socialMedia?.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Social platforms
              </p>
              <ul className="mt-3 divide-y divide-slate-100">
                {user.socialMedia.map((social, index) => (
                  <li
                    key={social._id || index}
                    className="flex flex-wrap items-center justify-between gap-2 py-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{social.platform}</p>
                      <p className="text-sm text-slate-500">
                        {social.followers || 0} followers
                      </p>
                    </div>
                    {social.url && (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-emerald-800 hover:underline"
                      >
                        Open profile
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ) : (
        <section className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Brand profile</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field label="Company">{user.companyName}</Field>
            <Field label="Industry">{user.industry}</Field>
            <div className="sm:col-span-2 flex gap-3">
              <GlobalOutlined className="mt-0.5 text-emerald-700" />
              <Field label="Website">
                {user.website ? (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-800 hover:underline"
                  >
                    {user.website}
                  </a>
                ) : null}
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Company description">{user.companyDescription}</Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Previous experience">{user.previousExperience}</Field>
            </div>
          </div>
        </section>
      )}

      {/* Completed campaigns — influencer */}
      {isInfluencer && (
        <section className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Completed campaigns</h2>
              <p className="mt-1 text-sm text-slate-500">
                {completedCount} campaign{completedCount === 1 ? "" : "s"} finished with approved work
              </p>
            </div>
            <Link
              href="/dashboard/campaigns"
              className="text-sm font-semibold text-emerald-800 hover:underline"
            >
              View all campaigns
            </Link>
          </div>

          {completedCampaigns.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">No completed campaigns yet.</p>
          ) : (
            <ul className="mt-6 divide-y divide-slate-100">
              {completedCampaigns.slice(0, 6).map((campaign) => (
                <li
                  key={campaign.id || campaign._id}
                  className="flex flex-wrap items-start justify-between gap-3 py-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{campaign.campaignName}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {campaign.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <Tag color="success">Completed</Tag>
                    {campaign.budget != null && (
                      <p className="mt-1 text-sm font-medium text-emerald-800">
                        ${campaign.budget}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default Profile;
