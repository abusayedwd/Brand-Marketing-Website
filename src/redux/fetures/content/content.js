import { apiSlice } from "@/redux/api/apiSlice";

const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContentPage: builder.query({
      query: (key) => `/content/${key}`,
    }),
  }),
});

export const { useGetContentPageQuery } = contentApi;
