'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, Link } from '@/i18n/navigation';
import { Matatu, useGetMatatusQuery } from '@/store/matatuApi';
import getPaginationRange from '@/app/components/utils/getpaginationpage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';

interface MatatusApiResponse {
    message: Matatu[];
}

// Defining ApiError locally to avoid a dependency on the auth page
interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

const MatatuList = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { data: apiResponse, isLoading, error } = useGetMatatusQuery() as {
        data: MatatusApiResponse | undefined;
        isLoading: boolean;
        error: ApiError;
    };

    const matatusData = apiResponse?.message ?? [];

    const containerClass = "bg-white shadow p-6 border border-gray-200";

    if (isLoading) {
        return (
            <div className={containerClass}>
                <h3 className="text-xl font-semibold text-[#58181C] mb-4">Matatus</h3>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={containerClass}>
                <h3 className="text-xl font-semibold text-[#58181C] mb-4">Matatus</h3>
                <div className="p-4 text-center text-red-500">
                    Failed to load available matatus.
                </div>
            </div>
        );
    }

    if (matatusData.length === 0) {
        return (
            <div className={containerClass}>
                <h3 className="text-xl font-semibold text-[#58181C] mb-4">Matatu Management</h3>
                <div className="p-4 text-center text-muted-foreground">
                    No matatus found. Please add one.
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <Link href="/dashboard/matatu-register">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                            Register Matatu
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const filteredMatatus = matatusData.filter((matatu: Matatu) => {
        const query = searchQuery.toLowerCase();
        return (
            matatu.number_plate?.toLowerCase().includes(query) ||
            matatu.owner?.toString().includes(query) ||
            (matatu.route?.some((routeId: number) => routeId?.toString().includes(query)) ?? false)
        );
    });

    const totalPages = Math.ceil(filteredMatatus.length / itemsPerPage);
    const paginatedMatatus = filteredMatatus.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleViewMatatu = (id: number) => {
        router.push(`/dashboard/matatu/${id}/details`);
    };

    return (
        <div className={containerClass}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#58181C]">Matatus</h3>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by plate, owner..."
                        className="pl-8 sm:w-[300px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            {filteredMatatus.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedMatatus.map((matatu: Matatu) => (
                            <Card
                                key={matatu.id}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => handleViewMatatu(matatu.id)}
                            >
                                <CardHeader>
                                    <CardTitle>{matatu.name || matatu.number_plate}</CardTitle>
                                    <CardDescription>{matatu.number_plate}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Owner:</span>
                                        <span>{matatu.owner ?? '—'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Seats:</span>
                                        <span>{matatu.number_of_seats}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Screens:</span>
                                        <span>{matatu.no_of_screens}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-wrap gap-2">
                                    <Badge variant={matatu.is_active ? 'default' : 'destructive'}>
                                        {matatu.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                    <Badge variant={matatu.is_verified ? 'default' : 'secondary'}>
                                        {matatu.is_verified ? 'Verified' : 'Not Verified'}
                                    </Badge>
                                    <Badge variant={matatu.is_under_maintenance ? 'destructive' : 'default'}>
                                        {matatu.is_under_maintenance ? 'Maintenance' : 'Operational'}
                                    </Badge>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 px-2">
                            <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
                                Showing{" "}
                                <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredMatatus.length)}</span> of{" "}
                                <span className="font-medium">{filteredMatatus.length}</span> results
                            </p>

                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span className="sr-only">Previous</span>&lt;
                                </button>
                                {getPaginationRange(currentPage, totalPages).map((page, index) => (
                                    <button key={index} onClick={() => typeof page === "number" && setCurrentPage(page)} disabled={page === "..."} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page ? "z-10 bg-primary text-primary-foreground" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"} focus:z-20`}>
                                        {page}
                                    </button>
                                ))}
                                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span className="sr-only">Next</span>&gt;
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            ) : (
                <div className="p-4 text-center text-muted-foreground">
                    No matatus found matching your search criteria.
                </div>
            )}
        </div>
    );
};

export default MatatuList;
