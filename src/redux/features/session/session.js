import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSession: builder.query({
      query: ({ search, page, limit }) => ({
        url: "/sessions/admin/all",
        method: "GET",
        params: { query: search, page, limit },
      }),
      providesTags: [tagTypes.session],
    }),

    getAllUserWithRole: builder.query({
      query: ({ search, page, limit, role }) => ({
        url: "/users",
        method: "GET",
        params: { query: search, page, limit, role },
      }),
      providesTags: [tagTypes.coach],
    }),

    warnSession: builder.mutation({
      query: (data) => ({
        url: `/sessions/admin/warn`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.session],
    }),

    cancelSession: builder.mutation({
      query: (data) => ({
        url: `/sessions/cancel`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.session],
    }),

    
  }),
});

export const {
  useGetAllSessionQuery,
  useGetAllUserWithRoleQuery,
  useWarnSessionMutation,
  useCancelSessionMutation,
} = sessionApi;
