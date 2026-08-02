"use client";

import { useMemo } from "react";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";

/** Logged-in user helper for marketing pages (skips API when no token). */
export default function useAuthUser() {
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const { data, isLoading, isError } = useLogedUserQuery(undefined, {
    skip: !hasToken,
  });

  const user = data?.data?.attributes?.user || data?.data?.attributes || null;
  const role = user?.role || null;
  const isLoggedIn = hasToken && !!user && !isError;

  return useMemo(
    () => ({
      user,
      role,
      isLoggedIn,
      isLoading: hasToken && isLoading,
      hasToken,
    }),
    [user, role, isLoggedIn, isLoading, hasToken]
  );
}
