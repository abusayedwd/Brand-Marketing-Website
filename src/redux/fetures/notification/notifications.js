import { apiSlice } from "@/redux/api/apiSlice";

const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => `/notifications?limit=20`,
      providesTags: [{ type: "Notification" }],
    }),
    getUnreadCount: builder.query({
      query: () => `/notifications/unread-count`,
      providesTags: [{ type: "Notification" }],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Notification" }],
    }),
    markAllNotificationsRead: builder.mutation({
      query: () => ({
        url: `/notifications/read-all`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Notification" }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationsApi;
