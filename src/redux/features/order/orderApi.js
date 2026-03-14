import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ page, limit, query } = {}) => ({
        url: `/orders/all?page=${page}&limit=${limit}&query=${query ?? ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, order_status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { order_status },
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
