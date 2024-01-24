import React, { useState } from 'react';
import axios from 'axios';

const Hero = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [bidAmount, setBidAmount] = useState('');

    const handleClick = (index) => {
        // Toggle the selected index
        setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleBidChange = (event) => {
        // Update the bid amount
        setBidAmount(event.target.value);
    };

    const handleSubmitBid = async () => {
        try {
            // Make a POST request to your backend API
            const response = await axios.get('/api/stored', {
                name: 'Your Name', // Replace with actual user name
                selectedIndexes: [...Array(12)].map((_, index) => selectedIndex === index),
                bidAmount: Number(bidAmount),
            });

            // Handle the response from the server (if needed)
            console.log('Bid submitted successfully:', response.data);

            // Optionally, you can reset the bid amount and selected index
            setBidAmount('');
            setSelectedIndex(null);
        } catch (error) {
            console.error('Error submitting bid:', error);
        }
    }

    return (
        <div className="bg-gray-200 py-8 md:py-16">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Left Area - Square Image */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <img
                        src="https://images.firstpost.com/wp-content/uploads/2015/11/haokip-isl-goa.jpg?impolicy=website&width=320&height=180"
                        alt="Square Image"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                {/* Right Area - Name, Age, Category, Small Square Images, and Bid Textarea */}
                <div className="w-full md:w-1/2 md:pl-8">
                    {/* Name */}
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">Your Name</h1>

                    {/* Age */}
                    <p className="text-sm md:text-base mb-2">Age: 25</p>

                    {/* Category */}
                    <p className="text-sm md:text-base mb-4">Category: Developer</p>

                    {/* Small Square Images */}
                    <div className="flex flex-wrap justify-between md:justify-start pt-4 space-x-2">
                        {[...Array(12)].map((_, index) => (
                            <div
                                key={index}
                                className={`w-6 h-6 md:w-10 md:h-10 bg-blue-500 rounded-full mb-2 cursor-pointer ${selectedIndex === index ? 'bg-green-500' : ''
                                    }`}
                                onClick={() => handleClick(index)}
                            ></div>
                        ))}
                    </div>

                    {/* Bid Textarea */}
                    <div className="pt-4">
                        <textarea
                            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md resize-none"
                            placeholder="Place your bid..."
                            value={bidAmount}
                            onChange={handleBidChange}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        onClick={handleSubmitBid}
                    >
                        Submit Bid
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
