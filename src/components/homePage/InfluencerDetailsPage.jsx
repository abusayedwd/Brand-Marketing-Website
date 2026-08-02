"use client";

import { Spin, Alert, Avatar } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  ArrowLeftOutlined,
  CheckCircleFilled,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useSigleInfluencerQuery } from "@/redux/fetures/user/signleInfluencer";
import url from "@/redux/api/baseUrl";
import CreatorRatings from "@/components/homePage/CreatorRatings";
import useAuthUser from "@/hooks/useAuthUser";

const socialIcons = {
  Facebook: <FacebookOutlined />,
  Instagram: <InstagramOutlined />,
  Twitter: <TwitterOutlined />,
  YouTube: <YoutubeOutlined />,
  Youtube: <YoutubeOutlined />,
  TikTok: <VideoCameraOutlined />,
};

const formatFollowers = (n) => {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
};

const InfluencerSinglePage = ({ id }) => {
  const { data: influencer, error, isLoading } = useSigleInfluencerQuery(id);
  const router = useRouter();
  const { hasToken, role } = useAuthUser();
  const inviteHref = hasToken
    ? role === "brand"
      ? "/dashboard/campaigns/create-campaign"
      : "/dashboard/campaigns"
    : "/auth/login";
  const inviteLabel = hasToken
    ? role === "brand"
      ? "Create campaign"
      : "Go to campaigns"
    : "Log in to collaborate";

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-sm text-slate-500">Loading creator profile…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Alert
          message="Could not load this creator"
          description="Please go back and try again."
          type="error"
          showIcon
          className="max-w-md"
        />
      </div>
    );
  }

  if (!influencer?.data?.attributes?.user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-slate-500">
        <UserOutlined className="mb-3 text-4xl text-slate-300" />
        <p>No creator found.</p>
      </div>
    );
  }

  const user = influencer.data.attributes.user;
  const completed =
    influencer.data.attributes.completedCampaignsCount ?? 0;
  const avatarSrc = user.image?.url ? `${url}${user.image.url}` : undefined;
  const totalFollowers = (user.socialMedia || []).reduce(
    (sum, s) => sum + (Number(s.followers) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white pb-16">
      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-emerald-100 bg-[#0b1f17] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.28),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-200/90 transition hover:text-white"
          >
            <ArrowLeftOutlined />
            Back
          </button>

          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end">
            <Avatar
              size={120}
              src={avatarSrc}
              icon={!avatarSrc && <UserOutlined />}
              className="!border-2 !border-emerald-400/40 !bg-emerald-900 shadow-xl"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Content creator
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {user.fullName}
              </h1>
              {user.userName && (
                <p className="mt-1 text-emerald-100/70">@{user.userName}</p>
              )}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50/80 sm:text-base">
                {user.bio || "This creator has not added a bio yet."}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-100/85">
                <span>
                  <strong className="text-white">{completed}</strong> campaigns completed
                </span>
                {totalFollowers > 0 && (
                  <span>
                    <strong className="text-white">{formatFollowers(totalFollowers)}</strong>{" "}
                    total followers
                  </span>
                )}
                {user.isEmailVerified && (
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <CheckCircleFilled /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Platforms */}
        {user.socialMedia?.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">Platforms</h2>
            <p className="mt-1 text-sm text-slate-500">Where this creator publishes</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {user.socialMedia.map((social) => {
                const icon = socialIcons[social.platform] || <GlobalOutlined />;
                return (
                  <a
                    key={social._id || social.platform + social.url}
                    href={social.url?.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 border-b border-emerald-100 pb-4 transition hover:border-emerald-400"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-lg text-emerald-800 transition group-hover:bg-[#0b1f17] group-hover:text-emerald-100">
                      {icon}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{social.platform}</p>
                      <p className="text-sm text-slate-500">
                        {formatFollowers(social.followers)} followers
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          {/* About / contact */}
          <section className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">Details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              {user.email && (
                <div className="flex gap-3">
                  <MailOutlined className="mt-0.5 text-emerald-700" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Email</dt>
                    <dd>
                      <a href={`mailto:${user.email}`} className="text-slate-800 hover:text-emerald-800">
                        {user.email}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
              {user.phoneNumber && (
                <div className="flex gap-3">
                  <PhoneOutlined className="mt-0.5 text-emerald-700" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Phone</dt>
                    <dd className="text-slate-800">{user.phoneNumber}</dd>
                  </div>
                </div>
              )}
              {user.address && (
                <div className="flex gap-3">
                  <EnvironmentOutlined className="mt-0.5 text-emerald-700" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Location</dt>
                    <dd className="text-slate-800">{user.address}</dd>
                  </div>
                </div>
              )}
              {user.website && (
                <div className="flex gap-3">
                  <GlobalOutlined className="mt-0.5 text-emerald-700" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Website</dt>
                    <dd>
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-emerald-800 hover:underline"
                      >
                        {user.website.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            {user.interests?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Interests
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-900"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={inviteHref}
              className="mt-8 inline-flex h-11 items-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {inviteLabel}
            </Link>
          </section>

          {/* Ratings */}
          <section className="lg:col-span-3">
            <h2 className="text-lg font-bold text-slate-900">Ratings & reviews</h2>
            <p className="mt-1 text-sm text-slate-500">
              Feedback from brands after completed campaigns
            </p>
            <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8">
              <CreatorRatings userId={user.id || user._id || id} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSinglePage;
