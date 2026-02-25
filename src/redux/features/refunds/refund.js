import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const refundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRefunds: builder.query({
      query: ({ search, page, limit }) => ({
        url: "/refunds",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.refunds],
    }),

    acceptRefund: builder.mutation({
      query: (requestId) => ({
        url: `/refunds/accept`,
        method: "PATCH",
        body: { requestId },
      }),
      invalidatesTags: [tagTypes.refunds],
    }),


    rejectRefund: builder.mutation({
      query: (data) => ({
        url: `/refunds/reject`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.refunds],
    }),
  }),
});

export const {
  useGetAllRefundsQuery,
  useAcceptRefundMutation,
  useRejectRefundMutation
} = refundApi;
