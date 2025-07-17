



import { apiSlice } from "../../api/apiSlice";

const approvedDraft = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        approvedDraft : builder.mutation({
            query: (data) => ({
                url: `/campaigns/approveDraft`,
                method: "POST",
                body: data  
            }),
            invalidatesTags:[{type:"Campaign"}]
        })
    })
})

export const {useApprovedDraftMutation} = approvedDraft;