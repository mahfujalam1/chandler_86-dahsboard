import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
    getPlayerGrowth: builder.query({
      query: (year) => ({
        url: `/users/growth?year=${year}`,
        method: "GET",
      }),
    }),

    getAllReports: builder.query({
      query: () => ({
        url: `/dashboard/reports`,
        method: "GET",
      }),
      providesTags: [tagTypes.reports],
    }),

    replyReport: builder.mutation({
      query: ({ reportId, data }) => ({
        url: `/dashboard/reports/${reportId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.reports],
    }),

    getPlatformFee: builder.query({
      query: () => ({
        url: `/dashboard/fee`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),

    addPlatformFee: builder.mutation({
      query: (data) => ({
        url: "/dashboard/fee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.dashboard],
    }),

    blockUser: builder.mutation({
      query: (data) => ({
        url: `/users/admin/toggle-block`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.coach, tagTypes.player, tagTypes.users],
    }),

    warnUser: builder.mutation({
      query: (data) => ({
        url: `/users/admin/warn-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.coach, tagTypes.player, tagTypes.users],
    }),
  }),
});

export const {
  useGetDashboardStatusQuery,
  useGetPlayerGrowthQuery,
  useAddPlatformFeeMutation,
  useGetPlatformFeeQuery,
  useGetAllReportsQuery,
  useReplyReportMutation,
  useBlockUserMutation,
  useWarnUserMutation
} = dashboardApi;
