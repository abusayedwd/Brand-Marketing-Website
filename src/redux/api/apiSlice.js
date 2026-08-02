import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import url from "./baseUrl";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/v1`,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: [
    "Profile",
    "Campaign",
    "Wallet",
    "Coupon",
    "About",
    "Notification",
    "Plans",
    "Favorites",
    "CompletedCampaign",
    "Support",
    "Ratings",
  ],
  endpoints: () => ({}),
});
