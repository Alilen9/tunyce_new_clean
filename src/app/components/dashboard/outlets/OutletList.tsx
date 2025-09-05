'use client';

import { useCallback, useMemo } from 'react';
import { useGetOutletsQuery } from '@/store/outletsApi';
import { Outlet } from '@/types/outletstypes';
import { useRouter } from '@/i18n/navigation';
import { FeaturedItem } from './featured-items';
import { LoadingSkeleton } from './Skeleton-List';

const OutletList = () => {
    const router = useRouter();

    // Fetch outlets data with RTK Query
    const { data: outlets, isLoading, isError } = useGetOutletsQuery();

    // Handle outlet item click
    const handleClick = useCallback((id: string) => {
        router.push(`/dashboard/outlets/${id}/details`);
    }, [router]);

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
                    No outlets found.
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
        <div className="bg-white shadow p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-[#58181C] mb-4">Outlets</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#C81E1E]/80 scrollbar-track-[#f4c542]/10 py-2">
                {renderOutlets}
            </div>
        </div>
    );
};

export default OutletList;