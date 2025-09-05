'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useGetMatatuBysaccosQuery, useGetMatatuByfaultsQuery, useGetMatatusQuery, Matatu } from '@/store/matatuApi';
import getPaginationRange from '@/app/components/utils/getpaginationpage';
import { ApiError } from '../../auth/page';

interface MatatusApiResponse {
  message: Matatu[];
}
// The types are correctly added to SaccosDisplay and FaultDisplay
const SaccosDisplay: React.FC<{ matatuId: number }> = ({ matatuId }) => {
  const { data: saccos  , isLoading, error } = useGetMatatuBysaccosQuery({matatusaccos: matatuId });

  if (isLoading) {
    return <span className="text-muted-foreground text-xs">Loading saccos...</span>;
  }
  if (error) {
    // console.error(Error fetching fault for matatu ${matatuId}:, error);
    return <span className="text-red-500 text-xs">Error</span>;
  }
 

  
  return (
    <div className="text-xs">
      <span className="font-semibold">{saccos?.name}</span>
      <br />
    </div>
  );
};


const FaultDisplay: React.FC<{ matatuId: number }> = ({ matatuId }) => {
  const { data: faults  , isLoading, error } = useGetMatatuByfaultsQuery({matatufaults: matatuId });

  if (isLoading) {
    return <span className="text-muted-foreground text-xs">Loading fault...</span>;
  }
  if (error) {
    // console.error(Error fetching fault for matatu ${matatuId}:, error);
    return <span className="text-red-500 text-xs">Error</span>;
  }
 

  // Find the latest fault based on fault_date (assuming it's a date string)
  // You might need to adjust 'fault_date' based on your actual Fault interface


  return (
    <div className="text-xs">
      <span className="font-semibold">{faults?.name}</span>
      <br />
    </div>
  );
};




export default function MatatuPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /// We are now explicitly defining the type of data returned by the hook
  const { data: apiResponse, isLoading, error } = useGetMatatusQuery() as {
    data: MatatusApiResponse | undefined;
    isLoading: boolean;
    error: ApiError;
  };

  // The matatusData variable is now correctly assigned the array from the message property.
  // The type annotation is no longer needed on this line, as it is inferred correctly.
  const matatusData = apiResponse?.message ?? [];
  
  console.log("MatatusData:", matatusData);
  // --- Conditional Rendering Guard Clauses ---
  
  // 1. Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // 2. Handle error state
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load available matatus.
      </div>
    );
    }
    
    // 3. Handle no matatus found state
    if (matatusData.length === 0) {
    return (
    <div className="p-6 flex flex-col">
    <h1 className="text-2xl font-bold mb-4">Matatu Management</h1>
    <div className="p-4 text-center text-muted-foreground">
    No matatus found. Please add one.
    </div>
    <div className="flex bg-red justify-center gap-4 mt-4">
      <Link href="matatu-register">
        <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
        Register Matatu
        </button>
      </Link>
    </div>
    </div>
    );
  }

  // --- Data Processing (only runs if data exists) ---

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Matatu Management</h1>

      {filteredMatatus.length > 0 ? (
        <>
          <table className="min-w-full text-sm table-auto">
            <thead className="border-t border-y bg-table dark:border-gray-800 dark:bg-table">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium text-gray-500">Owner</th>
                <th className="px-4 py-3 font-medium text-gray-500">Sacco</th>
                <th className="px-4 py-3 font-medium text-gray-500">Number Plate</th>
                <th className="px-4 py-3 font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 font-medium text-gray-500">Driver</th>
                <th className="px-4 py-3 font-medium text-gray-500">Seats</th>
                <th className="px-4 py-3 font-medium text-gray-500">Maintenance</th>
                <th className="px-4 py-3 font-medium text-gray-500">Fault</th>
                <th className="px-4 py-3 font-medium text-gray-500">Verified</th>
                <th className="px-4 py-3 font-medium text-gray-500">active status</th>
                <th className="px-4 py-3 font-medium text-gray-500"> no_of_screens</th>
              </tr>
            </thead>
            <tbody className="bg-table dark:bg-table">
              {paginatedMatatus.map((matatu: Matatu) => (
                <tr
                  key={matatu.id}
                  className="border-b cursor-pointer hover:bg-gray-600 focus:bg-gray-600"
                  onClick={() => handleViewMatatu(matatu.id)}
                >
                  <td className="px-4 py-3">{matatu.owner ?? "—"}</td>
                  <td className="px-4 py-3"><SaccosDisplay matatuId={matatu.id} /></td>
                  <td className="px-4 py-3">{matatu.number_plate ?? "—"}</td>
                  <td className="px-4 py-3">{matatu.name ?? "—"}</td>
                  <td className="px-4 py-3">{matatu.current_driver ?? "—"}</td>
                  <td className="px-4 py-3">{matatu.number_of_seats}</td>
                  <td className="px-4 py-3">{matatu.is_under_maintenance ? "✅" : "❌"}</td>
                  <td className="px-4 py-3"><FaultDisplay matatuId={matatu.id} /></td>
                  <td className="px-4 py-3">{matatu.is_verified ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{matatu.is_active ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{matatu.no_of_screens}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 px-2">
              <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredMatatus.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredMatatus.length}</span> results
              </p>

              <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20"
                >
                  <span className="sr-only">Previous</span>&lt;
                </button>
                {getPaginationRange(currentPage, totalPages).map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                    disabled={page === "..."}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === page
                        ? "z-10 bg-indigo-600 text-white focus-visible:outline-indigo-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    } focus:z-20`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20"
                >
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
}
