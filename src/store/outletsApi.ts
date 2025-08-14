import { CreatedOutletResponse, CreateOutletPayload, Outlet, OutletType, IndustryType, GoodsType, ServiceType } from '@/types/outletstypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const outletsApi = createApi({
  reducerPath: 'outletsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend.tunycemedia.com/api/v1/',
    prepareHeaders: (headers, {  }) => {
       const token = sessionStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
   tagTypes: [ 'Outlets', 'OutletTypes', 'Industries', 'Services', 'Goods'],
 endpoints: (builder) => ({
    /**
     * Mutation for creating a new outlet.
     * @param outletData The payload containing the outlet details.
     * @returns The newly created outlet data, including its ID.
     */
    createOutlet: builder.mutation<CreatedOutletResponse, CreateOutletPayload>({
      query: (outletData) => ({
        url: 'outlets/outlets/', // Endpoint for creating an outlet (adjust if different)
        method: 'POST',
        body: outletData,
      }),
      // Invalidate the 'Outlets' tag to refetch the list of outlets after creation
      invalidatesTags: ['Outlets'],
    }),

    // --- Example of how you might fetch Outlet Types and Industries ---
    // You would typically have separate endpoints for these lookup tables.

    getOutlets: builder.query<Outlet[], void>({
      query: () => 'outlets/outlets/',
      providesTags: ['Outlets'],
    }),
     getOutletDetails: builder.query<Outlet, string>({ // <-- Modified query definition
      query: (id) => `outlets/outlets/${id}/`, // <-- Modified URL to include ID
      providesTags: (_result, _error, id) => [{ type: 'Outlets', id }], // Provide tag for specific outlet
    }),

    getOutletTypes: builder.query<OutletType[], void>({
      query: () => 'outlets/outlet-types', 
      providesTags: ['OutletTypes'],
    }),

    getIndustries: builder.query<IndustryType[], void>({
      query: () => 'outlets/industries', // Assuming an endpoint like /api/v1/industries
      providesTags: ['Industries'],
    }),

    getServices: builder.query<IndustryType[], void>({
      query: () => 'outlets/services', // Assuming an endpoint like /api/v1/industries
      providesTags: ['Services'],
    }),
    getGoods: builder.query<GoodsType[], void>({
      query: () => 'outlets/goods', // Assuming an endpoint like /api/v1/industries
      providesTags: ['Services'],
    }),

    //You might also have mutations to create new types/industries if you allow on-the-fly creation
    createOutletType: builder.mutation<OutletType, { name: string }>({
      query: (newType) => ({
        url: '/outlets/outlet-types',
        method: 'POST',
        body: newType,
      }),
      invalidatesTags: ['OutletTypes'],
    }),
    createOutletIndustry: builder.mutation<IndustryType, { name: string }>({
      query: (newType) => ({
        url: '/outlets/industries',
        method: 'POST',
        body: newType,
      }),
      invalidatesTags: ['Industries'],
    }),
    createOutletServices: builder.mutation<ServiceType, { name: string }>({
      query: (newType) => ({
        url: '/outlets/services',
        method: 'POST',
        body: newType,
      }),
      invalidatesTags: ['Services'],
    }),

    createOutletGoods: builder.mutation<ServiceType, { name: string }>({
      query: (newType) => ({
        url: '/outlets/goods',
        method: 'POST',
        body: newType,
      }),
      invalidatesTags: ['Goods'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateOutletMutation,
  useGetOutletTypesQuery,
  useGetIndustriesQuery,
  useCreateOutletTypeMutation,
  useCreateOutletIndustryMutation,
  useCreateOutletServicesMutation,
  useGetServicesQuery,
  useCreateOutletGoodsMutation,
  useGetGoodsQuery,
  useGetOutletsQuery,
  useGetOutletDetailsQuery
} = outletsApi; 