"use client";

import Link from "next/link";
import { Empty, Spin } from "antd";
import { useGetFavoritesQuery } from "@/redux/fetures/favorites/favorites";
import FavoriteButton from "@/components/shared/FavoriteButton";
import StartChatButton from "@/components/shared/StartChatButton";
import getMediaUrl from "@/utils/getMediaUrl";

export default function FavoritesPage() {
  const { data, isLoading, isError } = useGetFavoritesQuery();
  const items = data?.data?.attributes || [];

  return (
    <div className="mx-auto max-w-5xl px-2 py-2">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Saved
      </p>
      <h1 className="mt-1 text-2xl font-bold text-slate-900">Favorite creators</h1>
      <p className="mt-1 text-sm text-slate-500">
        Creators you saved for future campaigns.
      </p>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spin />
        </div>
      ) : isError ? (
        <p className="mt-8 text-sm text-rose-600">Could not load favorites.</p>
      ) : items.length === 0 ? (
        <div className="mt-10">
          <Empty description="No saved creators yet. Open a profile and tap Save." />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => {
            const creator = item.influencerId || {};
            const id = creator.id || creator._id;
            return (
              <li
                key={item.id || id}
                className="flex gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
              >
                <img
                  src={getMediaUrl(creator.image)}
                  alt={creator.fullName}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/influencer/${id}`}
                    className="font-semibold text-slate-900 hover:text-emerald-700"
                  >
                    {creator.fullName || "Creator"}
                  </Link>
                  {creator.userName && (
                    <p className="text-xs text-slate-400">@{creator.userName}</p>
                  )}
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {creator.bio || creator.interests?.[0] || "No bio yet"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <StartChatButton userId={id} size="small" />
                    <FavoriteButton influencerId={id} size="small" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
