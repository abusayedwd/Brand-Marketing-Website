import { apiSlice } from "../../api/apiSlice";

const updateUser = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ data, formData, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data || formData,
      }),
      invalidatesTags: [{ type: "Profile" }],
    }),
  }),
});

export const { useUpdateUserMutation } = updateUser;
