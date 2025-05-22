import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
  
    baseUrl: "https://s3000.sobhoy.com", 
    // baseUrl: "https://api.mynexthome.ng/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },

    
  }),
  tagTypes: ["Profile", "Property", "Chat", "Coupon", "About"],  

  endpoints: () => ({}),
});