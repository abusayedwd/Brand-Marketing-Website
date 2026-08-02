import { apiSlice } from "@/redux/api/apiSlice";

const rejectDraftApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    rejectDraft: builder.mutation({
      query: (data) => ({
        url: `/campaigns/rejectDraft`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Campaign" }, { type: "Notification" }],
    }),
  }),
});

export const { useRejectDraftMutation } = rejectDraftApi;
