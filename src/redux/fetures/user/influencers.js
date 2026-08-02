 
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
      query: ({ socialMedia, fullName, interests, platform, minFollowers, address } = {}) => {
        const params = new URLSearchParams({ role: "influencer" });

        if (interests) params.append("interests", interests);
        if (socialMedia) params.append("socialMedia", socialMedia);
        if (fullName) params.append("fullName", fullName);
        if (platform) params.append("platform", platform);
        if (minFollowers) params.append("minFollowers", minFollowers);
        if (address) params.append("address", address);

        return `/users?${params.toString()}`;
      },
      providesTags: [{ type: "Profile" }],
    }),
  }),
});

export const { useGetInfluencersQuery } = getInfluencers;

