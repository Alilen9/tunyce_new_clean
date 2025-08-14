'use client';

import { FeaturedItem } from '@/app/components/dashboard/outlets/featured-items';
import { LoadingSkeleton } from '@/app/components/dashboard/outlets/Skeleton-List';
import { Outlet } from '@/types/outletstypes';
import { IoAdd } from 'react-icons/io5';
import { useCallback, useMemo, useState } from 'react';
import { useGetOutletsQuery } from '@/store/outletsApi';
import { Link, useRouter } from '@/i18n/navigation';

const Outletspage = () => {
    const router = useRouter();

    // Fetch outlets data with RTK Query
    const { data: outlets, isLoading, isError } = useGetOutletsQuery();

    // Handle outlet item click
    const handleClick = useCallback((id: string) => {
        console.log(`Clicked on outlet with ID: ${id}`);  
        router.push(`outlets/${id}/details`);
    }, []);

    // Memoized outlet list rendering to prevent unnecessary re-renders
    const renderOutlets = useMemo(() => {
        if (isLoading) {
            return Array.from({ length: 4 }, (_, index) => (
                <LoadingSkeleton key={`skeleton-${index}`} />
            ));
        }

        if (isError) {
            return (
                <div className="w-full text-center text-red-600 py-10">
                    Error loading outlets. Please try again later.
                </div>
            );
        }

        if (!outlets || outlets.length === 0) {
            return (
                <div className="w-full text-center text-gray-500 py-10">
                    No outlets found. Click{' '}
                    <span className="font-bold text-[#C81E1E]">&ldquo;New Outlet&ldquo;</span> to add one!
                </div>
            );
        }

        return outlets.map((outlet: Outlet) => (
            <FeaturedItem
                key={outlet.id}
                title={outlet.name}
                onClick={() => handleClick(String(outlet.id))}
            />
        ));
    }, [outlets, isLoading, isError, handleClick]);

    return (
        <div className="w-full px-6 py-8 min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-[#58181C]">My Outlets</h2>
                <Link href="outlets/outlets-register">
                    <button
                        className="flex items-center gap-2 text-white border bg-[#C81E1E] hover:bg-[#a11414] font-semibold px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                        aria-label='Add new outlet'>
                        <IoAdd className="text-xl" />
                        New Outlet
                    </button>
                </Link>
            </div>

            {/* Scrollable Outlet List */}
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#C81E1E]/80 scrollbar-track-[#f4c542]/10 py-2">
                {renderOutlets}
            </div>
        </div>
    );
};

export default Outletspage;