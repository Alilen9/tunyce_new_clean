'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useCreateMatatuMutation, useGetSaccosQuery, Matatu, SaccoMlt, useGetRoutesQuery, Routes } from '@/store/matatuApi';
import { ApiError } from '@/app/[locale]/auth/page';

// A new interface to match the data we will send to the API.
interface NewMatatuData extends Pick<Matatu, 'name' | 'number_plate' | 'number_of_seats' | 'no_of_screens' | 'sacco'> {
  // We're updating this to a number array based on the API's error.
  route: number[];
}

// Interface to represent the structure of a specific API error response
// interface ApiErrorResponse {
//   number_plate?: string[];
//   route?: string[];
// }

export default function MatatuRegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewMatatuData>({
    name: '',
    number_plate: '',
    number_of_seats: 0,
    no_of_screens: 0,
    sacco: undefined,
    route: [], // Initialize route as an empty array
  });

  // Fetching available saccos and routes using the RTK Query hooks
  const { data: saccos, isLoading: isSaccosLoading, error: saccosError } = useGetSaccosQuery();
  // We now expect the routes data to be an object with a 'message' key.
  const { data: routesData, isLoading: isRoutesLoading, error: routesError } = useGetRoutesQuery();
  
  const [createMatatu, { isLoading: isSubmitting, isSuccess }] = useCreateMatatuMutation();
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let updatedValue: string | number | number[] = value;

    if (name === 'sacco') {
      updatedValue = Number(value);
    } else if (name === 'route') {
      // The API expects an array of route IDs, so we'll wrap the single selected value in an array.
      updatedValue = value ? [Number(value)] : [];
    } else if (type === 'number') {
      updatedValue = Number(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      // The API now expects a single route ID, so we pass it directly.
      const payload = {
        ...formData
      };

      await createMatatu(payload).unwrap();
      setStatusMessage('Matatu registered successfully!');
      // Reset form after successful submission
      setFormData({
        name: '',
        number_plate: '',
        number_of_seats: 0,
        no_of_screens: 0,
        sacco: undefined,
        route: [] // Reset route to an empty array
      });

      router.push("/matatu");
    } catch (err) {
  console.error('❌ Registration failed - full error object', err);
  const apiError = err as ApiError;
  let message: string = 'registration failed';

  if (apiError?.data) {
    // Drill into "error" key if present
    const errorData = (apiError.data as ApiError) || apiError.data;

    if (typeof errorData === 'string') {
      message = errorData;
    } else if (typeof errorData === 'object') {
      const firstError = Object.values(errorData)
        .flat()
        .find((msg) => typeof msg === 'string');
      if (firstError) {
        message = firstError;
      }
    }
  }

  setStatusMessage(message);
}

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Register New Matatu</h2>

      {statusMessage && (
        <div className={`p-3 rounded-md ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {statusMessage}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="number_plate" className="block text-sm font-medium text-gray-700">Number Plate</label>
          <input
            id="number_plate"
            name="number_plate"
            type="text"
            value={formData.number_plate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="number_of_seats" className="block text-sm font-medium text-gray-700">Number of Seats</label>
          <input
            id="number_of_seats"
            name="number_of_seats"
            type="number"
            value={formData.number_of_seats}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="no_of_screens" className="block text-sm font-medium text-gray-700">No. of Screens</label>
          <input
            id="no_of_screens"
            name="no_of_screens"
            type="number"
            value={formData.no_of_screens}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      {/* Sacco Select Dropdown */}
      <div>
        <label htmlFor="sacco" className="block text-sm font-medium text-gray-700">Sacco</label>
        <select
          id="sacco"
          name="sacco"
          value={formData.sacco ?? ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a Sacco</option>
          {isSaccosLoading ? (
            <option disabled>Loading saccos...</option>
          ) : saccosError ? (
            <option disabled>Error loading saccos</option>
          ) : (
            saccos?.map((sacco: SaccoMlt) => (
              <option key={sacco.id} value={sacco.id}>
                {sacco.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Route Select Dropdown */}
      <div>
        <label htmlFor="route" className="block text-sm font-medium text-gray-700">Route</label>
        <select
          id="route"
          name="route"
          value={formData.route[0] ?? ''} // We're using the first item of the array here
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a Route</option>
          {isRoutesLoading ? (
            <option disabled>Loading routes...</option>
          ) : routesError ? (
            <option disabled>Error loading routes</option>
          ) : (
            routesData?.message?.map((route: Routes) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))
          )}
        </select>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Register Matatu'}
      </button>
    </form>
  );
}
