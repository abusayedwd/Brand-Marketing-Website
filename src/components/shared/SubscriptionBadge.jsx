"use client";

import { Tooltip } from "antd";
import { CrownFilled } from "@ant-design/icons";

const planLabel = (planName) =>
  planName && planName !== "no-plan" ? planName : "Subscribed";

/**
 * Shows a crown badge for users with an active subscription (`isSubscribe`).
 * variant: "dark" (on dark hero backgrounds), "light" (on white), "icon" (compact, cards/header).
 */
export default function SubscriptionBadge({ user, variant = "light", className = "" }) {
  if (!user?.isSubscribe) return null;

  const label = planLabel(user.planName);

  if (variant === "icon") {
    return (
      <Tooltip title={`${label} member`}>
        <span
          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-[11px] text-amber-950 ${className}`}
          aria-label={`${label} member`}
        >
          <CrownFilled />
        </span>
      </Tooltip>
    );
  }

  const styles =
    variant === "dark"
      ? "bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/40"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${styles} ${className}`}
    >
      <CrownFilled />
      {label}
    </span>
  );
}
