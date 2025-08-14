import { matatufaults, matatusaccos } from '@/types/matatu';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface Matatu {
  id: number;
  name: string;
  number_plate?: string;
  number_of_seats: number;
  is_verified: boolean;
  is_active: boolean;
  is_under_maintenance: boolean;
  is_under_fault: boolean;
  no_of_screens: number;
  exterior_images?: string;
  interior_images?: string;
  bundle_last_paid?: string;
  latitude?: string;
  longitude?: string;
  created_at: string;
  updated: string;
  owner?: number;
  sacco?: number;
  current_driver?: number;
  route: number[]; // This is the old type. It will be ignored in the mutation type.
  drivers: number[];
}

export interface SaccoMlt {
  id: number;
  name: string;
}

export interface FaultMlt {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
// New interface for Routes
export interface Routes {
  id: number;
  name: string;
  matatu_count: string;
}

// New interface for the API response that contains the message array
export interface RoutesResponse {
  message: Routes[];
}

export const matatuApi = createApi({
  reducerPath: 'matatusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend.tunycemedia.com/api/v1/',
    prepareHeaders: (headers, { }) => {
       const token = sessionStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMatatus: builder.query<Matatu[], void>({
      query: () => '/matatu/matatus',
    }),
    
    getMatatuById: builder.query<unknown, {matatuId: number}>({
      query: ({matatuId}) => `mlt/matatus/${matatuId}/`,

    }),
    // The createMatatu mutation now correctly expects a single number for 'route'
    createMatatu: builder.mutation<Matatu, Pick<Matatu, 'name' | 'number_plate' | 'number_of_seats' | 'no_of_screens' | 'sacco'> & { route?: number[] }>({
      query: (newMatatuData) => ({
        url: '/matatu/create_matatu',
        method: 'POST',
        body: newMatatuData,
      }),
    }),
    getSaccos: builder.query<SaccoMlt[], void>({
      query: () => '/mlt/saccos/',
    }),
    // New query to get all routes, now expecting RoutesResponse
    getRoutes: builder.query<RoutesResponse, void>({
      query: () => '/region/routes/',
    }),
    getMatatuByfaults: builder.query<matatufaults, {matatufaults: number}>({
      query: ({matatufaults}) => `/mlt/faults/${matatufaults}`,
    }),
    getMatatuBysaccos: builder.query<matatusaccos, {matatusaccos: number}>({
      query: ({matatusaccos}) => `/mlt/saccos/${matatusaccos}`,
      
    }),
    updateMatatu: builder.mutation<Matatu, { id: number; data: Partial<Matatu> }>({
      query: ({ id, data }) => ({
        url: `mlt/matatus/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    partialUpdateMatatu: builder.mutation<Matatu, { id: number; data: Partial<Matatu> }>({
      query: ({ id, data }) => ({
        url: `mlt/matatus/${id}/`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});


export const {
  useGetMatatusQuery,
  useGetMatatuByIdQuery,
  useUpdateMatatuMutation,
  usePartialUpdateMatatuMutation,
  useGetMatatuByfaultsQuery,
  useGetMatatuBysaccosQuery,
  useCreateMatatuMutation,
  useGetSaccosQuery,
  useGetRoutesQuery
  
} = matatuApi;
