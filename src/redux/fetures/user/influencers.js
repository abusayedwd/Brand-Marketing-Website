 
// const { apiSlice } = require("@/redux/api/apiSlice");

// const getInfluencers = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getInfluencers: builder.query({
//       // query: () => `/users?role=influencer`,
//       query: ({ socialMedia = "", fullName = "", interests = "" }) =>
//         `/users?role=influencer&interests=${encodeURIComponent(
//           interests
//         )}&socialMedia=${encodeURIComponent(
//           socialMedia
//         )}&fullName=${encodeURIComponent(fullName)}`,

//       providesTags: [{ type: "Profile" }],
//     }),
//   }),
// });

// export const { useGetInfluencersQuery } = getInfluencers;


const { apiSlice } = require("@/redux/api/apiSlice");

const getInfluencers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfluencers: builder.query({
      query: ({ socialMedia, fullName, interests }) => {
        const params = new URLSearchParams({ role: "influencer" });

        if (interests) params.append("interests", interests);
        if (socialMedia) params.append("socialMedia", socialMedia);
        if (fullName) params.append("fullName", fullName);

        const url = `/users?${params.toString()}`;
        console.log("Fetching influencers with URL:", url);  // For debugging
        return url;
      },
      providesTags: [{ type: "Profile" }],
    }),
  }),
});

export const { useGetInfluencersQuery } = getInfluencers;

