'use client'
import { useCallback, useState } from 'react';
import { useCreateOutletMutation, useGetOutletTypesQuery, useGetIndustriesQuery, useGetServicesQuery } from '@/store/outletsApi';
import { OutletType, IndustryType, CreateOutletPayload, GoodsType, ServiceResponse } from '@/types/outletstypes';
import { useRouter } from '@/i18n/navigation';


// Define TypeScript interfaces for form data and errors
interface FormData {
  name: string;
  location: string;
  outlet_type: string;
  industry: string;
  service: string;
  good: string;
}

interface FieldErrors {
  [key: string]: string[] | undefined;
}

interface ApiResponseError {
  data?: {
    error: {
      [key: string]: string[] | undefined;
    };
  };
}

export function OutletRegistrationForm() {
  const router = useRouter();
  // RTK Query hooks for data fetching and mutation
  const [createOutlet, { isLoading: isSubmitting }] = useCreateOutletMutation();
  const { data: outletTypes, isLoading: isLoadingOutletTypes } = useGetOutletTypesQuery();
  const { data: servicesData, isLoading: isLoadingServices } = useGetServicesQuery();
  const { data: industries, isLoading: isLoadingIndustries } = useGetIndustriesQuery();

  // We can use the same API call for both services and goods.
  const goods = servicesData;
  const services = servicesData;
  const isLoadingGoods = isLoadingServices; // Use the same loading state

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    outlet_type: '',
    industry: '',
    good: '',
    service: '',
  });
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Handle form input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear field-specific error when user starts typing
    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatusMessage('');
      setFieldErrors({});

      try {
        const payload: CreateOutletPayload = {
          name: formData.name,
          outlet_type_id: formData.outlet_type ? Number(formData.outlet_type) : 0,
          industry_id: formData.industry ? Number(formData.industry) : 0,
          service_ids: formData.service ? [Number(formData.service)] : [],
          good_ids: formData.good ? [Number(formData.good)] : [],
        };

        await createOutlet(payload).unwrap();
        setStatusMessage('Outlet registered successfully!');
        setFormData({ name: '', location: '', outlet_type: '', industry: '', service: '', good: '' });
        router.push(`/dashboard/outlets`);
      } catch (err) {
         console.error('❌ Registration failed:', err);
        // Correctly type the error to avoid the `any` error
        const apiError = err as ApiResponseError;
        if (apiError?.data?.error) {
          setFieldErrors(apiError.data.error);
          setStatusMessage('Please fix the errors below.');
        } else {
          setStatusMessage('Registration failed. Please try again later.');
        }
      }
    },
    [createOutlet, formData]
  );

  // Determine if form is disabled
  const isFormDisabled = isSubmitting || isLoadingOutletTypes || isLoadingIndustries || isLoadingGoods || isLoadingServices;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Register New Outlet</h2>

      <form onSubmit={handleSubmit} className='space-y-5' noValidate>
        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-3 rounded-lg text-sm font-medium text-center ${
              fieldErrors && Object.keys(fieldErrors).length > 0
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
            role="alert"
          >
            {statusMessage}
          </div>
        )}
        {/* Outlet Name */}
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Outlet Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
            required
            disabled={isFormDisabled}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && (
            <p id="name-error" className="text-red-500 text-xs mt-1">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
            required
            disabled={isFormDisabled}
            aria-invalid={!!fieldErrors.location}
            aria-describedby={fieldErrors.location ? 'location-error' : undefined}
          />
          {fieldErrors.location && (
            <p id="location-error" className="text-red-500 text-xs mt-1">
              {fieldErrors.location[0]}
            </p>
          )}
        </div>

        {/* Outlet Type Dropdown */}
        <div className="space-y-1">
          <label htmlFor="outlet_type" className="block text-sm font-medium text-gray-700">
            Outlet Type
          </label>
          <select
            id="outlet_type"
            name="outlet_type"
            value={formData.outlet_type}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
            required
            disabled={isFormDisabled}
            aria-invalid={!!fieldErrors.outlet_type}
            aria-describedby={fieldErrors.outlet_type ? 'outlet_type-error' : undefined}
          >
            <option value="">Select an Outlet Type</option>
            {isLoadingOutletTypes ? (
              <option disabled>Loading outlet types...</option>
            ) : (
              outletTypes?.map((type: OutletType) => (
                type.id !== undefined && (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                )
              ))
            )}
          </select>
          {fieldErrors.outlet_type && (
            <p id="outlet_type-error" className="text-red-500 text-xs mt-1">
              {fieldErrors.outlet_type[0]}
            </p>
          )}
        </div>

        {/* Industry Dropdown */}
        <div className="space-y-1">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
            required
            disabled={isFormDisabled}
            aria-invalid={!!fieldErrors.industry}
            aria-describedby={fieldErrors.industry ? 'industry-error' : undefined}
          >
            <option value="">Select an Industry</option>
            {isLoadingIndustries ? (
              <option disabled>Loading industries...</option>
            ) : (
              industries?.map((industry: IndustryType) => (
                industry.id !== undefined && (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                )
              ))
            )}
          </select>
          {fieldErrors.industry && (
            <p id="industry-error" className="text-red-500 text-xs mt-1">
              {fieldErrors.industry[0]}
            </p>
          )}
        </div>

        {/* A grid container for the two new dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Services Dropdown */}
          <div className="space-y-1">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Services
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              disabled={isFormDisabled}
              aria-invalid={!!fieldErrors.service}
              aria-describedby={fieldErrors.service ? 'service-error' : undefined}
            >
              <option value="">Select a Service</option>
              {isLoadingServices ? (
                <option disabled>Loading services...</option>
              ) : (
                services?.map((service: ServiceResponse) => (
                  service.id !== undefined && (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  )
                ))
              )}
            </select>
            {fieldErrors.service && (
              <p id="service-error" className="text-red-500 text-xs mt-1">
                {fieldErrors.service[0]}
              </p>
            )}
          </div>

          {/* Goods Dropdown */}
          <div className="space-y-1">
            <label htmlFor="good" className="block text-sm font-medium text-gray-700">
              Goods
            </label>
            <select
              id="good"
              name="good"
              value={formData.good}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              disabled={isFormDisabled}
              aria-invalid={!!fieldErrors.good}
              aria-describedby={fieldErrors.good ? 'good-error' : undefined}
            >
              <option value="">Select a Good</option>
              {isLoadingGoods ? (
                <option disabled>Loading goods...</option>
              ) : (
                goods?.map((good: GoodsType) => (
                  good.id !== undefined && (
                    <option key={good.id} value={good.id}>
                      {good.name}
                    </option>
                  )
                ))
              )}
            </select>
            {fieldErrors.good && (
              <p id="good-error" className="text-red-500 text-xs mt-1">
                {fieldErrors.good[0]}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isFormDisabled}
          className="w-full py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Register Outlet'}
        </button>
      </form>
    </div>
  );
}