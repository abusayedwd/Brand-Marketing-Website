


import { apiSlice } from "../../api/apiSlice";

const updateUser = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser : builder.mutation({
            query: ({data,id}) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data
            })
        })
    })
})

export const {useUpdateUserMutation} = updateUser;