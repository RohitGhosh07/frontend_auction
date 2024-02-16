import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token
    window.localStorage.removeItem('username');
    // Navigate to the login page
    navigate('/db');
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        className="w-32 block bg-red-500 hover:bg-red-400 focus:bg-red-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
