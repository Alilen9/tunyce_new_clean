import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend.tunycemedia.com/api/v1/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      
      // Add Authorization header if token exists
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'SignUp'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: 'auth/login/',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        },
      }),
      invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'auth/logout/',
        method: 'POST',
        // No body needed for this request
      }),
      invalidatesTags: ['Auth'],
    }),
    signUser: builder.mutation({
      query: (data: { email: string; password: string; username: string; phone_number: string }) => ({
        url: 'auth/signup/',
        method: 'POST',
        body: {
          email: data.email,
          username: data.username,
          phone_number: data.phone_number, // Assuming username is the same as email
          password: data.password,
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    forgotPassword: builder.mutation({
      query: (data: { email: string }) => ({
        url: 'auth/forgot_password/',
        method: 'POST',
        body: {
          email: data.email,
        },
      }),
    }),

    resetPassword: builder.mutation({
      query: (data: { token: string; password: string }) => ({
        url: 'auth/reset_password/',
        method: 'POST',
        body: {
          token: data.token,
          password: data.password,
        },
      }),
    }),

    changePassword: builder.mutation({
      query: (data: { old_password: string; new_password: string }) => ({
        url: 'auth/change_password/',
        method: 'POST',
        body: {
          old_password: data.old_password,
          new_password: data.new_password,
        },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useSignUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
