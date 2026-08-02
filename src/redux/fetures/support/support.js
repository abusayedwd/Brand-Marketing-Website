import { apiSlice } from "@/redux/api/apiSlice";

const supportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitSupportTicket: builder.mutation({
      query: (body) => ({
        url: "/support",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitSupportTicketMutation } = supportApi;
