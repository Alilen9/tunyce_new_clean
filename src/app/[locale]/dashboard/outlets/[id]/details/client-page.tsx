'use client'; // <-- IMPORTANT: This directive must be at the very top of this file

import React from 'react';

// Define the expected shape of the report data (already provided and correct for Matatu)
export interface MatatuMlt {
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
  route: number[]; // Assuming this is an array of route IDs
  drivers: number[]; // Assuming this is an array of driver IDs
}

// Define the props interface for this specific client component
interface MatatuDetailsClientProps {
  matatuId: number; // This component now receives the parsed ID directly as 'matatuId'
}

const OutletsClient: React.FC<MatatuDetailsClientProps> = ({ matatuId }) => {


  // //handle Go Back
  // const handleGoBack = () => {
  //   window.history.back();
  // };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      
    </div>
  );
};

export default OutletsClient;