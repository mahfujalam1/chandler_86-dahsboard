import { baseApi } from "../../baseApi/baseApi";
import { tagTypes } from "../../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    usersGrowth: builder.query({
      query: (year) => ({
        url: `/users/user-growth?year=${year}`,
        method: "GET",
      }),
    }),

    getAllUsers: builder.query({
      query: ({ role, limit }) => ({
        url: `/users?limit=${limit}&role=${role}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUsersGrowthQuery, useGetAllUsersQuery, useChangePasswordMutation, useUpdateUserMutation } = userApi;
