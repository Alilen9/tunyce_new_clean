// src/app/(dashboard)/advertisements/[id]/report/page.tsx
// This is a Server Component. DO NOT add 'use client' here.

import React from 'react'; 
import OutletsClient from './client-page';

// Update the interface to reflect that params is a Promise
interface MatatuDetailsPageProps {
  params: Promise<{ id: string }>; // <-- CHANGED HERE: params is now a Promise
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // Also consider if searchParams exists and needs to be a Promise
}

// Make your Server Component async and await the params
const OutletsDetailsPage = async ({ params }: MatatuDetailsPageProps) => { // <-- CHANGED HERE: Added 'async'
  // Await params to destructure its value
  const { id } = await params; // <-- CHANGED HERE: Await params
  
  const OutletsId = parseInt(id, 10); // Use the awaited 'id'

  console.log("Server Component (Report) - Received Advert ID:", id); // Log the awaited ID

  return <OutletsClient OutletsId={OutletsId} />;
};

export default OutletsDetailsPage;