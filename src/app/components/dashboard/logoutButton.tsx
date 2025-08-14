'use client';

import { useLogoutUserMutation } from "@/store/authApi";

export default function LogoutButton() {
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
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
