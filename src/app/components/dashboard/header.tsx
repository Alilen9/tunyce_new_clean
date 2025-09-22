'use client';

import { useLogoutUserMutation } from '@/store/authApi';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MdSettings } from 'react-icons/md';

export default function Header({ onToggle }: { onToggle: () => void }) {
  const [username, setUsername] = useState('User');
  const [initials, setInitials] = useState('U');

  // Use a useEffect hook to access sessionStorage on the client side
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username') || 'User';
    setUsername(storedUsername);

    const initialsValue =
      storedUsername.length >= 2
        ? storedUsername.substring(0, 2).toUpperCase()
        : storedUsername.substring(0, 1).toUpperCase();

    setInitials(initialsValue);
  }, []);

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser;

      // Clear session storage
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('csrfToken');

      console.log('Logged out successfully');
      // Optionally redirect
      window.location.href = '/auth';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="flex items-center justify-between bg-white border-b p-4 shadow-sm sticky top-0 z-30">
      <button
        onClick={onToggle}
        className="text-maroon hover:text-red cursor-pointer"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-800">{username}</span>

        {/* Profile circle with initials */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white border border-gray-300 font-semibold">
          {initials}
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="h-10 px-4 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer transition"
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>

        <button className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full cursor-pointer shadow hover:bg-gray-700 transition">
          <MdSettings size={18} className="inline" />
        </button>
      </div>
    </header>
  );
}
