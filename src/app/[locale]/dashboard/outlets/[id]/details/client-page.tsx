// src/app/components/outlets/OutletsClient.tsx

'use client';

import { useGetOutletDetailsQuery, useGetGoodsQuery, useGetServicesQuery } from '@/store/outletsApi';
import React, { useEffect, useState } from 'react';

// Define the new props interface to match your data
export interface OutletData {
  id: number;
  name: string;
  owner: string;
  outlet_type: {
    id: number;
    name: string;
  };
  industry: {
    id: number;
    name: string;
  };
  goods: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
    tags: string[];
  }[];
  services: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
  }[];
  number_of_seats: number | null;
  estimated_workers: number | null;
  estimated_daily_visitors: number | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated: string;
}

interface OutletsDetailsClientProps {
  OutletsId: number;
}

const OutletsClient: React.FC<OutletsDetailsClientProps> = ({ OutletsId }) => {
  const userToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

  // Fetch outlet details
  const { data: outletInfo, isLoading: isOutletLoading, isError: isOutletError } = useGetOutletDetailsQuery(
    OutletsId ? String(OutletsId) : '',
    { skip: !OutletsId || !userToken }
  );

  console.log("Outlet", outletInfo);

  // Fetch all goods and services from the APIs
  const { data: allGoods, isLoading: isGoodsLoading } = useGetGoodsQuery(undefined, { skip: !userToken });
  const { data: allServices, isLoading: isServicesLoading } = useGetServicesQuery(undefined, { skip: !userToken });

  console.log("All Goods", allGoods);
  console.log("All Services", allServices);
  const [displaySuccessNotification, setDisplaySuccessNotification] = useState(false);
  const [displayErrorNotification, setDisplayErrorNotification] = useState(false);
  const [displaySuccessText, setSuccessText] = useState('');
  const [displayErrorText, setDisplayErrorText] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (displayErrorNotification || displaySuccessNotification) {
      timer = setTimeout(() => {
        setDisplayErrorNotification(false);
        setDisplaySuccessNotification(false);
        setSuccessText('');
        setDisplayErrorText('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [displaySuccessNotification, displayErrorNotification]);

  if (isOutletLoading || isGoodsLoading || isServicesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  if (isOutletError || !outletInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-red-600">Failed to load outlet details.</div>
      </div>
    );
  }

  // Helper function to render a list of items with categories
  const renderItemsList = (
    title: string,
    items: {
      id: number;
      name: string;
      category?: { id: number; name: string };
    }[]
  ) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
              <span className="text-gray-700 font-medium">{item.name}</span>
              {item.category && (
                <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                  {item.category.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const detailCards = [
    { label: 'Owner', value: outletInfo.name ?? 'N/A' },
    // { label: 'Industry', value: outletInfo.industry?.name ?? 'N/A' },
    { label: 'Estimated Seats', value: outletInfo.number_of_seats ?? 'N/A' },
    { label: 'Estimated Workers', value: outletInfo.estimated_workers ?? 'N/A' },
    { label: 'Daily Visitors', value: outletInfo.estimated_daily_visitors ?? 'N/A' },
    { label: 'Latitude', value: outletInfo.latitude ?? 'N/A' },
    { label: 'Longitude', value: outletInfo.longitude ?? 'N/A' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 mt-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {outletInfo.name} <span className="text-gray-500">#{outletInfo.id}</span>
        </h2>
        <p className="text-gray-500 mb-8">
          Created: {outletInfo.created_at ? new Date(outletInfo.created_at).toLocaleString() : 'N/A'} | Last Updated: {outletInfo.updated_at ? new Date(outletInfo.updated_at).toLocaleString() : 'N/A'}
        </p>

        {/* General Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailCards.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Goods and Services Sections */}
        {renderItemsList('Goods', outletInfo?.goods)}
        {renderItemsList('Services', outletInfo?.services)}

      </div>

      {/* Notification Section */}
      {displaySuccessNotification && (
        <div className="fixed top-20 right-10 z-50">
          <div className="flex items-center max-w-xs p-4 text-green-700 bg-green-100 rounded-lg shadow">
            <div className="font-medium">{displaySuccessText}</div>
          </div>
        </div>
      )}

      {displayErrorNotification && (
        <div className="fixed top-20 right-10 z-50">
          <div className="flex items-center max-w-xs p-4 text-red-700 bg-red-100 rounded-lg shadow">
            <div className="font-medium">{displayErrorText}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutletsClient;