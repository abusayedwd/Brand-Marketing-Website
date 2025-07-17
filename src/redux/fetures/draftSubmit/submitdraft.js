

import { apiSlice } from "../../api/apiSlice";

const submitDraft = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        submitDraft : builder.mutation({
            query: ({id,formData}) => ({
                url: `/campaigns/submitDraft/${id}`,
                method: "POST",
                body:  formData
            }),
            invalidatesTags:[{type:"Campaign"}]
        })
    })
})

export const {useSubmitDraftMutation} = submitDraft;