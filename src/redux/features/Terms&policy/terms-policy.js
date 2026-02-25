import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const termAndPolicy = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addProduct: builder.mutation({
    //   query: (formdata) => {
    //     console.log("product data from apis file=>", formdata);
    //     return {
    //       url: "/products",
    //       method: "POST",
    //       body: formdata,
    //     };
    //   },
    //   invalidatesTags: [tagTypes.products],
    // }),

    getPolicy: builder.query({
      query: () => ({
        url: `/site-policy/PrivacyPolicy`,
        method: "GET",
      }),
      providesTags: [tagTypes.siteContent],
    }),

    getTerms: builder.query({
      query: () => ({
        url: `/site-policy/Terms`,
        method: "GET",
      }),
      providesTags: [tagTypes.siteContent],
    }),

    updateSiteContent: builder.mutation({
      query: (content) => {
        return {
          url: `/site-policy`,
          method: "POST",
          body: content,
        };
      },
      invalidatesTags: [tagTypes.siteContent],
    }),
  }),
});

export const { useGetPolicyQuery, useGetTermsQuery, useUpdateSiteContentMutation } =
  termAndPolicy;
