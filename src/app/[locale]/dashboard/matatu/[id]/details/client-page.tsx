'use client'; // <-- IMPORTANT: This directive must be at the very top of this file

import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { IoWarning } from 'react-icons/io5';
import Link from 'next/link';
import { FaBackward, FaCheckCircle, FaTimesCircle, FaTools, FaWrench } from 'react-icons/fa';
import { Car, Users, Monitor} from 'lucide-react'; // More relevant icons for matatus
import Image from 'next/image';
import { useGetMatatuByIdQuery } from '@/store/matatuApi';
import { Button } from '@/app/components/dashboard/ui/buttons';
import { CardHeader, CardTitle, CardContent, Card, CardDescription } from '@/app/components/ui/card';

// Define the props interface for this specific client component
interface MatatuDetailsClientProps {
  matatuId: number; // This component now receives the parsed ID directly as 'matatuId'
}

const MatatuClient: React.FC<MatatuDetailsClientProps> = ({ matatuId }) => {
  console.log("Client Component (Matatu Details) - Matatu ID:", matatuId);

  const { data, error, isLoading } = useGetMatatuByIdQuery({ matatuId });
  console.log("Matatu data: ", data);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background text-foreground">
        <ImSpinner2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium text-center">Loading matatu details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background text-destructive p-4">
        <IoWarning className="h-12 w-12 text-destructive mb-4" />
        <p className="text-xl font-semibold text-center mb-2">Error loading matatu details.</p>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          There was an issue fetching the matatu information. Please try again.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background text-muted-foreground p-4">
        <p className="text-lg">No matatu data found for ID: {matatuId}.</p>
        <Link
          href="/dashboard/matatus"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <FaBackward className="mr-2 h-4 w-4" /> Back to Matatu List
        </Link>
      </div>
    );
  }

  //handle Go Back
  const handleGoBack = () => {
    window.history.back();
  };

  // --- Render Matatu Data ---
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="w-full max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Matatu Details <span className="text-muted-foreground"># {data.number_plate || data.name}</span>
          </h1>
          <Button
            onClick={handleGoBack}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4"
          >
            <FaBackward className="mr-2 h-4 w-4" />
            Back to Matatus
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Matatu Name</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.name}</div>
                  <p className="text-xs text-muted-foreground">Plate: {data.number_plate || 'N/A'}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Seats</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.number_of_seats}</div>
                  <p className="text-xs text-muted-foreground">Passenger capacity</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Screens</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.no_of_screens}</div>
                  <p className="text-xs text-muted-foreground">Ad screens installed</p>
                </CardContent>
              </Card>
            </div>

            {(data.exterior_images || data.interior_images) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Images</CardTitle>
                  <CardDescription>Visual representation of the matatu.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.exterior_images && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Exterior</h3>
                      <div className="relative aspect-video">
                        <Image
                          src={data.exterior_images}
                          alt={`${data.name} Exterior`}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {data.interior_images && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Interior</h3>
                      <div className="relative aspect-video">
                        <Image
                          src={data.interior_images}
                          alt={`${data.name} Interior`}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-x-4 gap-y-6 pt-2">
                <div className="flex items-center space-x-3">
                  {data.is_verified ? <FaCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" /> : <FaTimesCircle className="h-6 w-6 text-red-500 flex-shrink-0" />}
                  <div>
                    <p className="text-sm font-medium">Verified</p>
                    <p className="text-xs text-muted-foreground">{data.is_verified ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {data.is_active ? <FaCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" /> : <FaTimesCircle className="h-6 w-6 text-red-500 flex-shrink-0" />}
                  <div>
                    <p className="text-sm font-medium">Active</p>
                    <p className="text-xs text-muted-foreground">{data.is_active ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {data.is_under_maintenance ? <FaTools className="h-6 w-6 text-yellow-500 flex-shrink-0" /> : <FaCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />}
                  <div>
                    <p className="text-sm font-medium">Maintenance</p>
                    <p className="text-xs text-muted-foreground">{data.is_under_maintenance ? 'Yes' : 'Operational'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {data.is_under_fault ? <FaWrench className="h-6 w-6 text-red-500 flex-shrink-0" /> : <FaCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />}
                  <div>
                    <p className="text-sm font-medium">Fault</p>
                    <p className="text-xs text-muted-foreground">{data.is_under_fault ? 'Reported' : 'No Faults'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Associated Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between"><span>Owner ID:</span> <span className="font-medium">{data.owner || 'N/A'}</span></div>
                <div className="flex justify-between"><span>SACCO ID:</span> <span className="font-medium">{data.sacco || 'N/A'}</span></div>
                <div className="flex justify-between"><span>Current Driver ID:</span> <span className="font-medium">{data.current_driver || 'N/A'}</span></div>
                <div className="flex justify-between"><span>Route IDs:</span> <span className="font-medium">{data.route?.join(', ') || 'N/A'}</span></div>
                <div className="flex justify-between"><span>Driver IDs:</span> <span className="font-medium">{data.drivers?.join(', ') || 'N/A'}</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between"><span>Last Bundle Paid:</span> <span className="font-medium">{data.bundle_last_paid ? new Date(data.bundle_last_paid).toLocaleDateString() : 'N/A'}</span></div>
                <div className="flex justify-between"><span>Location:</span> <span className="font-medium">{data.latitude && data.longitude ? `${data.latitude}, ${data.longitude}` : 'N/A'}</span></div>
                <div className="flex justify-between"><span>Created:</span> <span className="font-medium">{new Date(data.created_at).toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Last Updated:</span> <span className="font-medium">{new Date(data.updated).toLocaleString()}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatatuClient;