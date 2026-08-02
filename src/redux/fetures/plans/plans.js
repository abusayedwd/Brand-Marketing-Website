import { apiSlice } from "@/redux/api/apiSlice";

const plansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: (role) => `/plans${role ? `?role=${role}` : ""}`,
      providesTags: [{ type: "Plans" }],
    }),
  }),
});

export const { useGetPlansQuery } = plansApi;
