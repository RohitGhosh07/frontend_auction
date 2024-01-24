// AboutUs.js

import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Us</h1>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-8">
            <img
              src="https://img.theweek.in/content/dam/week/news/sports/images/2019/10/14/ISL-logo-pic.jpg" // Replace with your image URL
              alt="ISL Auction"
              className="w-full h-auto rounded-md shadow-lg transition-transform transform hover:scale-105"
            />
          </div>

          <div className="md:w-1/2 md:pl-12">
            <p className="text-lg mb-6 transition-colors hover:text-blue-500">
              Welcome to the ISL Footballers Auction website! We bring together football enthusiasts
              and talented players from the Indian Super League for an exciting auction experience.
            </p>

            <p className="text-lg mb-6 transition-colors hover:text-blue-500">
              Our platform allows you to discover and bid on your favorite footballers,
              contributing to the competitive and thrilling atmosphere of the ISL tournament.
            </p>

            <p className="text-lg mb-6 transition-colors hover:text-blue-500">
              Whether you're a team owner, a fan, or just passionate about football, our auction
              platform provides an engaging space for all. Explore the profiles of the players,
              place your bids, and experience the thrill of the ISL Footballers Auction!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
