'use client';

import { useState } from 'react';

export default function RegisterMatatuPage() {
  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    route: '',
    sacco: '',
    capacity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would usually send the data to your backend
    console.log('Submitting form:', formData);
    alert('Matatu registered successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Register a New Matatu</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Matatu Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Kilele Shuttle"
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number Plate</label>
          <input
            type="text"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
            placeholder="e.g. KCA 123A"
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
          <input
            type="text"
            name="route"
            value={formData.route}
            onChange={handleChange}
            placeholder="e.g. Nairobi - Rongai"
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sacco</label>
          <input
            type="text"
            name="sacco"
            value={formData.sacco}
            onChange={handleChange}
            placeholder="e.g. Niko Sacco"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of screens</label>
          <input
            type="number"
            name="screens"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="e.g. 14"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Register Matatu
        </button>
      </form>
    </div>
  );
}
