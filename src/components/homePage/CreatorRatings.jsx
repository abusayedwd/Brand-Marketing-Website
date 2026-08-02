"use client";

import { Rate, Empty, Spin } from "antd";
import { useGetUserRatingsQuery } from "@/redux/fetures/ratings/ratings";

export default function CreatorRatings({ userId }) {
  const { data, isLoading, isError } = useGetUserRatingsQuery(userId, {
    skip: !userId,
  });

  const payload = data?.data?.attributes || {};
  const average = payload.average || 0;
  const count = payload.count || 0;
  const ratings = payload.ratings || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return <p className="text-sm text-slate-500">Could not load ratings.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Rate disabled allowHalf value={average} />
        <span className="text-lg font-semibold text-slate-800">
          {average.toFixed(1)}
        </span>
        <span className="text-sm text-slate-500">
          ({count} review{count === 1 ? "" : "s"})
        </span>
      </div>

      {ratings.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No reviews yet" />
      ) : (
        <ul className="space-y-4">
          {ratings.slice(0, 8).map((r) => (
            <li
              key={r.id || r._id}
              className="border-b border-slate-100 pb-4 last:border-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">
                  {r.fromUserId?.fullName || "Brand"}
                </p>
                <Rate disabled value={r.rating} className="text-sm" />
              </div>
              {r.campaignId?.campaignName && (
                <p className="mt-1 text-xs text-emerald-700">
                  {r.campaignId.campaignName}
                </p>
              )}
              {r.review && (
                <p className="mt-2 text-sm text-slate-600">{r.review}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
