'use client';

import { useState } from 'react';

export default function MatatuEditForm() {
  const [matatuId, setMatatuId] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [route, setRoute] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Editing matatu:', { matatuId, plateNumber, route });
    // Perform API update here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Matatu ID</label>
        <input
          type="text"
          value={matatuId}
          onChange={(e) => setMatatuId(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">New Plate Number</label>
        <input
          type="text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">New Route</label>
        <input
          type="text"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}
