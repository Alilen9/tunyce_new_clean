// src/app/(dashboard)/advertisements/[id]/report/page.tsx
// This is a Server Component. DO NOT add 'use client' here.

import React from 'react';
import MatatuClient from './client-page'; 

// Update the interface to reflect that params is a Promise
interface MatatuDetailsPageProps {
  params: Promise<{ id: string }>; // <-- CHANGED HERE: params is now a Promise
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // Also consider if searchParams exists and needs to be a Promise
}

// Make your Server Component async and await the params
const MatatuDetailsPage = async ({ params }: MatatuDetailsPageProps) => { // <-- CHANGED HERE: Added 'async'
  // Await params to destructure its value
  const { id } = await params; // <-- CHANGED HERE: Await params
  
  const matatuId = parseInt(id, 10); // Use the awaited 'id'

  console.log("Server Component (Report) - Received Advert ID:", id); // Log the awaited ID

  return <MatatuClient matatuId={matatuId} />;
};

export default MatatuDetailsPage;