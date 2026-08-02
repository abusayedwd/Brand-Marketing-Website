"use client";

import Link from "next/link";
import { useGetOpenCampaignsQuery } from "@/redux/fetures/campaign/openCampaigns";
import useAuthUser from "@/hooks/useAuthUser";
import url from "@/redux/api/baseUrl";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function OpenCampaigns() {
  const { data, isLoading } = useGetOpenCampaignsQuery(6);
  const { isLoggedIn, role } = useAuthUser();
  const campaigns = data?.data?.attributes?.results || [];

  const primaryHref = isLoggedIn
    ? "/dashboard/campaigns"
    : "/auth/login";
  const primaryLabel = !isLoggedIn
    ? "Log in to apply"
    : role === "brand"
      ? "Go to my campaigns"
      : "Browse & apply";

  if (!isLoading && campaigns.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-emerald-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Open campaigns
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Campaigns recruiting creators now
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Upcoming paid campaigns brands have published — creators can show interest after login.
            </p>
          </div>
          <Link
            href={primaryHref}
            className="inline-flex h-11 items-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            {primaryLabel}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(isLoading ? Array.from({ length: 3 }) : campaigns).map((campaign, i) => {
            if (isLoading) {
              return (
                <div
                  key={`sk-${i}`}
                  className="h-64 animate-pulse rounded-3xl bg-emerald-50"
                />
              );
            }

            const imageSrc = campaign?.image
              ? `${url}${campaign.image}`
              : "/images/banner1.png";
            const brandName =
              campaign?.brandId?.fullName ||
              campaign?.brandId?.name ||
              "Brand";

            return (
              <article
                key={campaign.id || campaign._id}
                className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50/40 to-white"
              >
                <div className="relative h-40 overflow-hidden bg-emerald-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={campaign.campaignName || "Campaign"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    {brandName}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 line-clamp-1">
                    {campaign.campaignName}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {campaign.description || "Campaign brief available in dashboard."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>
                      {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
                    </span>
                    {campaign.selectedPlatforms?.length > 0 && (
                      <span>· {campaign.selectedPlatforms.join(", ")}</span>
                    )}
                  </div>
                  <Link
                    href={
                      isLoggedIn
                        ? `/dashboard/campaigns/details?id=${campaign.id || campaign._id}`
                        : "/auth/login"
                    }
                    className="mt-4 inline-flex text-sm font-semibold text-emerald-800 hover:underline"
                  >
                    {isLoggedIn ? "View campaign" : "Log in to view"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
