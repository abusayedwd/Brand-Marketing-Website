"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchOutlined, ArrowRightOutlined, TeamOutlined } from "@ant-design/icons";
import { useGetInfluencersQuery } from "@/redux/fetures/user/influencers";
import { useGetPublicStatsQuery } from "@/redux/fetures/stats/publicStats";
import SubscriptionBadge from "@/components/shared/SubscriptionBadge";
import useAuthUser from "@/hooks/useAuthUser";
import getMediaUrl from "@/utils/getMediaUrl";

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Facebook", "Snapchat", "Twitter"];

const compact = (n) => {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(num);
};

const totalFollowers = (socialMedia = []) =>
  socialMedia.reduce((sum, s) => sum + (Number(s.followers) || 0), 0);

// Real numbers only; a stat with no data yet is hidden rather than faked.
function LiveStats() {
  const { data } = useGetPublicStatsQuery();
  const s = data?.data?.attributes || data?.data || {};
  const items = [
    { label: "Creators", value: s.creators, format: compact },
    { label: "Brands", value: s.brands, format: compact },
    { label: "Approved deliverables", value: s.approvedDeliverables, format: compact },
    { label: "Paid to creators", value: s.paidToCreators, format: (v) => `$${compact(v)}` },
  ].filter((item) => Number(item.value) > 0);

  if (!items.length) return null;

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:flex sm:flex-wrap sm:gap-x-10">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs text-emerald-100/70">{item.label}</dt>
          <dd className="mt-0.5 text-2xl font-bold tabular-nums text-white">
            {item.format(item.value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CreatorStack() {
  const { data, isLoading } = useGetInfluencersQuery({});
  const creators = useMemo(() => {
    const list = data?.data?.attributes?.results || [];
    return list
      .filter((c) => c.image)
      .sort((a, b) => Number(!!b.isSubscribe) - Number(!!a.isSubscribe))
      .slice(0, 3);
  }, [data]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/10" />
        ))}
      </div>
    );
  }

  if (!creators.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-emerald-50/80">
        <TeamOutlined className="text-3xl text-emerald-300" />
        <p className="mt-3 font-semibold text-white">Creators are joining now</p>
        <p className="mt-1 text-sm">Be one of the first profiles brands discover.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {creators.map((c, i) => {
        const followers = totalFollowers(c.socialMedia);
        const niche = c.interests?.[0];
        return (
          <li
            key={c.id || c._id}
            className={`transition hover:-translate-y-0.5 ${i === 1 ? "lg:ml-10" : ""}`}
          >
            <Link
              href={`/influencer/${c.id || c._id}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-3 pr-5 text-slate-900 shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
            >
              <img
                src={getMediaUrl(c.image, "/images/default-avatar.svg")}
                alt={c.fullName}
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-semibold">
                  <span className="truncate">{c.fullName}</span>
                  <SubscriptionBadge user={c} variant="icon" />
                </p>
                <p className="truncate text-xs capitalize text-slate-500">
                  {[niche, c.socialMedia?.[0]?.platform].filter(Boolean).join(" · ") ||
                    "Content creator"}
                </p>
              </div>
              {followers > 0 && (
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums text-emerald-700">
                    {compact(followers)}
                  </p>
                  <p className="text-[11px] text-slate-400">followers</p>
                </div>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const Banner = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const { hasToken, role } = useAuthUser();

  const search = (platform = "") => onSearch?.({ searchValue: searchValue.trim(), platform });

  return (
    <section className="relative overflow-hidden bg-[#0b1f17] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.30),transparent_45%),radial-gradient(circle_at_88%_80%,rgba(16,185,129,0.16),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div className="min-w-0 space-y-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Influencer marketing, simplified
          </p>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Launch campaigns with creators who{" "}
            <span className="text-emerald-300">fit your brand</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-emerald-50/80 sm:text-lg">
            Find creators, pay securely upfront, approve drafts before they go live, and
            release payouts. One place for brands and creators.
          </p>

          <div className="flex flex-wrap gap-3">
            {hasToken ? (
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-400 px-6 font-semibold text-[#0b1f17] transition hover:bg-emerald-300"
              >
                {role === "brand" ? "Open brand dashboard" : "Open creator dashboard"}
                <ArrowRightOutlined />
              </Link>
            ) : (
              <>
                <Link
                  href="/influencer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-400 px-6 font-semibold text-[#0b1f17] transition hover:bg-emerald-300"
                >
                  Find creators
                  <ArrowRightOutlined />
                </Link>
                <Link
                  href="/auth/singup"
                  className="inline-flex h-12 items-center rounded-xl border border-white/25 px-6 font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
                >
                  Join as creator
                </Link>
              </>
            )}
          </div>

          <div className="max-w-xl space-y-3">
            <form
              className="flex rounded-xl bg-white p-1.5 shadow-lg"
              onSubmit={(e) => {
                e.preventDefault();
                search();
              }}
            >
              <label htmlFor="banner-search" className="sr-only">
                Search creators
              </label>
              <SearchOutlined className="ml-3 self-center text-slate-400" />
              <input
                id="banner-search"
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search creators by name"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-lg bg-[#0b1f17] px-5 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Search
              </button>
            </form>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => search(platform)}
                  className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50 transition hover:bg-white/20"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <LiveStats />
        </div>

        <div className="min-w-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
            Creators on the platform
          </p>
          <CreatorStack />
        </div>
      </div>
    </section>
  );
};

export default Banner;
