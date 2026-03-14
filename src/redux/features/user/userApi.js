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
      query: ({ page, limit, query } = {}) => ({
        url: `/users/search?query=${query}&page=${page}&limit=${limit}`,
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

    toggleBlockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/toggle-block`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: [tagTypes.users],
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

export const { useGetAllUsersQuery, useChangePasswordMutation, useToggleBlockUserMutation, useUsersGrowthQuery, useUpdateUserMutation } = userApi;
