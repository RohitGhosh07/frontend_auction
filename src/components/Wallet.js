import React, { useState, useEffect } from 'react';
import LineChartCard from './LineChart';

const Balance = ({ updateSelectedPlayer }) => {
    const [teams, setTeams] = useState([]);
    const [biddings, setBiddings] = useState([]);
    // const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [unsoldPlayers, setUnsoldPlayers] = useState([]);
    const [skipPlayers, setskipPlayers] = useState([]);
    const [displayedContent, setDisplayedContent] = useState('topBuys'); // Default content
    const [selectedBidding, setSelectedBidding] = useState(null);

    const handleBiddingClick = (bidding) => {
        setSelectedBidding(bidding);
    };

    const handleCloseModal = () => {
        setSelectedBidding(null);
    };


    const fetchUnsoldPlayers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/players/allplayers');
            const data = await response.json();
            const unsoldPlayersData = data.filter(player => player.state === 'U');
            setUnsoldPlayers(unsoldPlayersData);
            setDisplayedContent('unsoldPlayers');
        } catch (error) {
            console.error('Error fetching unsold players:', error);
        }
    };
    const fetchskippedPlayers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/players/allplayers');
            const data = await response.json();
            const skippedPlayersData = data.filter(player => player.state === 'Skipped');
            setskipPlayers(skippedPlayersData);
            setDisplayedContent('skipped');
        } catch (error) {
            console.error('Error fetching unsold players:', error);
        }
    };
   

    const topBuys = async () => {
        // Fetch data from the API endpoint
        fetch('http://localhost:5000/api/players/biddings/allbiddings')
            .then(response => response.json())
            .then(data => {
                // Sort the data based on biddingPrice in descending order
                const sortedBiddings = data.sort((a, b) => b.biddingPrice - a.biddingPrice);
                setBiddings(sortedBiddings);
                setDisplayedContent('topBuys');
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teams/allteams');
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);
    // Display only the first 8 players
    const displayedBiddings = biddings.slice(0, 12);

    return (
        <div>
            <>
                {/* component */}
                <div className="min-h-screen">
                    <div className="p-2 xl:ml-80">
                        <div className="mt-12">
                            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                                {teams.map((team) => (
                                    <div key={team._id} className="relative flex flex-col bg-clip-border rounded-xl bg-white bg-opacity-10 text-gray-100 shadow-md">
                                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                            <img src={team.image} alt={`Logo of ${team.name}`} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4 text-right">
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                                                {team.name}
                                            </p>
                                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                                                ₹{team.balance}
                                            </h4>
                                        </div>
                                        {/* Additional team-related content can be added here */}
                                    </div>
                                ))}
                            </div>
                            <div className="mb-4 grid grid-cols-1 overflow-x-hidden gap-6 xl:grid-cols-3">
                                {/* Your other JSX code here */}

                                {/* Display the first 8 biddings or unsold players based on the button clicked */}
                                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white bg-opacity-10 text-gray-100 shadow-md overflow-hidden xl:col-span-2">
                                    <div className="flex items-center justify-between p-4">
                                        <button className={`relative inline-block text-lg group ${displayedContent === 'topBuys' ? 'text-white' : ''}`} onClick={topBuys}>
                                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg hover:text-white">
                                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                <span className="relative">Top Buys</span>
                                            </span>
                                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                        </button>

                                        <button className={`relative inline-block text-lg group ${displayedContent === 'unsoldPlayers' ? 'text-white' : ''}`} onClick={fetchUnsoldPlayers}>
                                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg hover:text-white">
                                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                <span className="relative">Unsold Players</span>
                                            </span>
                                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                        </button>

                                        <button
                                            className={`relative inline-block text-lg group ${displayedContent === 'analytics' ? 'text-white' : ''}`}
                                            onClick={() => setDisplayedContent('analytics')}
                                        >
                                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg hover:text-white">
                                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                <span className="relative">Analytics</span>
                                            </span>
                                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                        </button>
                                        <button className={`relative inline-block text-lg group ${displayedContent === 'skipped' ? 'text-white' : ''}`} onClick={fetchskippedPlayers}>
                                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg hover:text-white">
                                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                <span className="relative">Skipped Players</span>
                                            </span>
                                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                        </button>
                                        <button className={`relative inline-block text-lg group ${displayedContent === 'skipped' ? 'text-white' : ''}`} onClick={fetchskippedPlayers}>
                                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg hover:text-white">
                                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                <span className="relative">Max Bid</span>
                                            </span>
                                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                        </button>

                                    </div>

                                    <div className="p-6 overflow-y-scroll overflow-x-hidden h-[400px]">
                                        {displayedContent === 'topBuys' && (
                                            <table className="w-full min-w-[640px] table-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Name</th>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Bidding Price</th>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Team</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {displayedBiddings.map((bidding) => (
                                                        <tr key={bidding._id}>
                                                            <td
                                                                className="py-3 px-5 border-b border-blue-gray-50 cursor-pointer"
                                                                onClick={() => handleBiddingClick(bidding)}
                                                            >
                                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold hover:bold hover:text-blue-500 transition duration-300">
                                                                    {bidding.name}
                                                                </p>
                                                            </td>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                                                    ₹{bidding.biddingPrice}
                                                                </p>
                                                            </td>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                                                    {bidding.team}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}

                                        {/* Modal/Pop-up */}
                                        {selectedBidding && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                                                    <div
                                                        className="w-full h-80 bg-contain rounded-lg shadow-md"
                                                        style={{
                                                            backgroundImage: `url(https://i.ibb.co/QdT4VKs/wp4126424-removebg-preview.png)`,
                                                        }}
                                                    />

                                                    <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                                                        <h3 className="py-2 font-bold tracking-wide text-center uppercase text-white hover:bold hover:text-blue-500 transition duration-300 ">
                                                            {selectedBidding.name}
                                                        </h3>
                                                        <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                                            <span className="font-bold text-gray-800 dark:text-gray-200">
                                                                ✨ {selectedBidding.team}✨
                                                            </span>
                                                            {/* <button
                                                                className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                                                                onClick={handleCloseModal}
                                                            >
                                                                ❌
                                                            </button> */}
                                                            <button
                                                                type="button"
                                                                class=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                                                onClick={handleCloseModal}
                                                            >
                                                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {displayedContent === 'unsoldPlayers' && (
                                            <table className="w-full min-w-[640px] table-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Name</th>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Category</th>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Age</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {unsoldPlayers.map(player => (
                                                        <tr key={player._id}>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                                                    {player.name}
                                                                </p>
                                                            </td>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                                                    {player.category}
                                                                </p>
                                                            </td>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                                                    {player.age}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                        {displayedContent === 'analytics' && (
                                            // Render LineChartCard for analytics
                                            <LineChartCard />
                                        )}
                                        {displayedContent === 'skipped' && (
                                            <table className="w-full min-w-[640px] table-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Name</th>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Category</th>
                                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">Age</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {skipPlayers.map(player => (
                                                        <tr key={player._id}>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50" onClick={() => updateSelectedPlayer(player)}
                                                            >
                                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">

                                                                    <a href="#playerprofile" className="hover:bold hover:text-blue-500 transition duration-300">
                                                                        {player.name}
                                                                    </a>

                                                                </p>
                                                            </td>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                                                    {player.category}
                                                                </p>
                                                            </td>
                                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                                                    {player.age}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Balance;
