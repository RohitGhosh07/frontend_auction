import React, { useState, useEffect } from 'react';
import BidList from './BidList';

const Hero = () => {
    const [players, setPlayers] = useState([]);

    // Fetch players and biddings data from your API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players/biddings/allbiddings');
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };

        fetchData();
    }, []);

    const imageStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/813/919/736/stadium-arena-lighting-football-wallpaper-preview.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(50%)', // Adjust the brightness to your preference
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between', // Adjust this based on your layout preference
    };

    const bidListContainerStyle = {
        display: 'flex',
        flexDirection: 'row', // Display BidLists horizontally
        overflowX: 'auto',    // Add horizontal scroll
        flex: '1',             // Takes 1/3 of the available space
        marginRight: '5px',    // Adjust spacing between BidList and Card
        
    };
    
    

  

    return (
        <div  id="about">
            <div style={imageStyle}></div>
            <h1 className="text-4xl text-white flex justify-center mt-7 font-bold mb-4 uppercase tracking-wider bg-slate-100 bg-opacity-20 backdrop-blur-md rounded-md shadow-md">Statistics</h1>
            <section id="about" style={containerStyle}>
                <div style={bidListContainerStyle}>
                    {/* Pass the players prop to BidList */}
                    <BidList players={players} />
                </div>

            </section>
        </div>
        
    );
};

export default Hero;
