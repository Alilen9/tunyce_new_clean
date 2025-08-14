'use client';

export default function EditMatatuPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Matatu Details</h1>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Matatu Name</label>
          <input
            type="text"
            placeholder="e.g. Sunrise Express"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number Plate</label>
          <input
            type="text"
            placeholder="e.g. KDG 123A"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
          <input
            type="text"
            placeholder="e.g. James Mwangi"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
          <input
            type="text"
            placeholder="e.g. Nairobi - Mombasa"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
          <input
            type="number"
            placeholder="e.g. 33"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md font-semibold"
          >
            Update Matatu
          </button>
        </div>
      </form>
    </div>
  );
}
