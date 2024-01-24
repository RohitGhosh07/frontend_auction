import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          <span className="text-yellow-400">The</span> Bid
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/auctions"
              className="text-white hover:text-yellow-400 transition duration-300 ease-in-out"
            >
              Auctions
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-yellow-400 transition duration-300 ease-in-out"
            >
              About Us
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
