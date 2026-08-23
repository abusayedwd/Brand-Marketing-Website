"use client";

import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const TikTokIcon = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const platformMeta = {
  instagram: { label: "IG", icon: <InstagramOutlined />, className: "bg-pink-50 text-pink-600" },
  tiktok: { label: "TT", icon: <TikTokIcon />, className: "bg-slate-100 text-slate-800" },
  facebook: { label: "FB", icon: <FacebookOutlined />, className: "bg-blue-50 text-blue-600" },
  youtube: { label: "YT", icon: <YoutubeOutlined />, className: "bg-red-50 text-red-600" },
  twitter: { label: "X", icon: <TwitterOutlined />, className: "bg-sky-50 text-sky-600" },
  snapchat: { label: "SC", icon: null, className: "bg-amber-50 text-amber-600" },
};

const hasFollowers = (value) => {
  if (value == null || value === "") return false;
  const n = String(value).replace(/[^\d.]/g, "");
  return n !== "" && n !== "0";
};

function getPlatforms(influencer) {
  const fromList = (influencer.socialMedia || [])
    .map((item) => ({
      key: (item.platform || "").toLowerCase(),
      count: item.followers,
    }))
    .filter((item) => item.key);

  if (fromList.length) return fromList;

  return Object.entries(influencer.followers || {}).map(([key, count]) => ({
    key,
    count,
  }));
}

export default function InfluencerCard({
  influencer,
  canView = false,
  onLockedClick,
}) {
  const href = `/influencer/${influencer.id}`;
  const niche =
    influencer.tag?.replace(/^#/, "") ||
    influencer.category ||
    influencer.interests?.[0] ||
    "";
  const platforms = getPlatforms(influencer).slice(0, 4);

  const open = (e) => {
    if (canView) return;
    e.preventDefault();
    onLockedClick?.();
  };

  return (
    <Link href={canView ? href : "#"} onClick={open} className="group block h-full">
      <article className="flex h-full flex-col items-center rounded-2xl border border-emerald-100 bg-white px-5 py-6 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
        <img
          src={influencer.image}
          alt={influencer.name}
          className="h-24 w-24 rounded-full object-cover ring-2 ring-emerald-100"
        />
        <h3 className="mt-3 line-clamp-1 text-base font-semibold text-slate-800">
          {influencer.name}
        </h3>
        {influencer.userName ? (
          <p className="line-clamp-1 text-xs text-slate-400">
            @{influencer.userName}
          </p>
        ) : null}
        {niche ? (
          <span className="mt-2.5 max-w-full truncate rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            {niche}
          </span>
        ) : null}

        {platforms.length > 0 ? (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {platforms.map(({ key, count }) => {
              const meta = platformMeta[key] || {
                label: key.slice(0, 2).toUpperCase(),
                icon: null,
                className: "bg-slate-50 text-slate-600",
              };
              return (
                <span
                  key={key}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.className}`}
                >
                  {meta.icon}
                  {hasFollowers(count) ? count : meta.label}
                </span>
              );
            })}
          </div>
        ) : null}

        <span className="mt-4 text-sm font-semibold text-emerald-700 group-hover:underline">
          View profile
        </span>
      </article>
    </Link>
  );
}
