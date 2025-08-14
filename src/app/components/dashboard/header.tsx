'use client';

import { useLogoutUserMutation } from '@/store/authApi';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MdSettings } from 'react-icons/md';

export default function Header({ onToggle }: { onToggle: () => void }) {
 
    const [username, setUsername] = useState('User');
    const [profilePlaceholder, setProfilePlaceholder] = useState(`https://placehold.co/34x34/1f2937/FFFFFF?text=U`);

    // Use a useEffect hook to access sessionStorage on the client side
    useEffect(() => {
      const storedUsername = sessionStorage.getItem('username') || 'User';
      setUsername(storedUsername);
      const initials = storedUsername.length >= 2 ? storedUsername.substring(0, 2).toUpperCase() : storedUsername.substring(0, 1).toUpperCase();
      setProfilePlaceholder(`https://placehold.co/34x34/1f2937/FFFFFF?text=${initials}`);
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
      <button onClick={onToggle} className="text-maroon hover:text-red cursor-pointer">
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-3">
        
        <span className="text-sm font-medium text-gray-800">{username}</span>
        <img
          src={ profilePlaceholder }
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700  cursor-pointer transition"
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
        <button className="flex items-center justify-center bg-gray-800 text-white px-3 py-3 rounded-full cursor-pointer shadow hover:bg-gray-700 transition">
          <MdSettings size={16} className="inline" />
        </button>
      </div>
    </header>
  );
}


