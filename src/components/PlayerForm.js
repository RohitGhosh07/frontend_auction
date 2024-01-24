import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerForm = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [biddingPrice, setBiddingPrice] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams] = useState([
    'Bengaluru FC | Owner: JSW Group',
    'Kerala Blasters FC | Owner: Sachin Tendulkar, etc.',
    'ATK Mohun Bagan FC | Owner: RPSG Group & Mohun Bagan FC',
  ]);

  const [errorPopup, setErrorPopup] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [submittedPlayers, setSubmittedPlayers] = useState([]);

  const handleModalClose = () => {
    setConfirmation(null);
    setErrorPopup('');
    setSuccessPopup(false);
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const apiUrl = 'http://localhost:5000/api/players';
        const response = await axios.get(apiUrl);
        setPlayers(response.data);
        setSelectedPlayer(response.data[currentPlayerIndex]);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [currentPlayerIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const apiUrl = 'http://localhost:5000/api/players/biddings';

      const body = {
        name: selectedPlayer.name,
        biddingPrice,
        team: selectedTeam,
      };

      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setConfirmation(response.data);
      setSuccessPopup(true);
      setBiddingPrice('');
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setSubmittedPlayers([...submittedPlayers, selectedPlayer._id]);
    } catch (error) {
      console.error('Error submitting bid:', error);

      if (axios.isAxiosError(error) && !error.response) {
        setErrorPopup('Network error. Please check your internet connection.');
      } else if (error.response) {
        if (error.response.status === 400) {
          setErrorPopup('Invalid data. Please check your input.');
        } else if (error.response.status === 401) {
          setErrorPopup('Unauthorized. Please log in.');
        } else {
          setErrorPopup('An error occurred. Please try again later.');
        }
      } else {
        setErrorPopup('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerChange = (event) => {
    const index = event.target.value;
    setSelectedPlayer(players[index]);
  };

  return (
    <div className="flex justify-center items-center flex-wrap min-h-screen">
      <div className="flex-1 text-center p-4">
        {selectedPlayer && (
          <div className="mb-4">
            <img
              src={selectedPlayer.team}
              alt={`${selectedPlayer.name}`}
              className="w-64 h-64 object-cover mx-auto rounded-full shadow-lg"
            />
            <p className="mt-2 text-gray-700 text-lg font-semibold">{`${selectedPlayer.name} `}</p>
          </div>
        )}
      </div>

      <div className="flex-1 max-w-md p-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Player:</label>
            <select
              value={players.indexOf(selectedPlayer)}
              onChange={handlePlayerChange}
              className="mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled={selectedPlayer === null || submittedPlayers.includes(selectedPlayer._id)}
            >
              {players.map((player, index) => (
                <option
                  key={player._id}
                  value={index}
                  disabled={submittedPlayers.includes(player._id)}
                >
                  {`${player.name} `}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bidding Price:</label>
            <input
              type="number"
              value={biddingPrice}
              onChange={(e) => setBiddingPrice(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Team:</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer transition duration-300 hover:bg-blue-600"
          >
            Submit Bid
          </button>
        </form>
      </div>

      {errorPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{errorPopup}</p>
            <button
              onClick={handleModalClose}
              className="bg-red-500 text-white px-6 py-3 rounded mt-4 cursor-pointer transition duration-300 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {successPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Success</h2>
            <p>Bid submitted successfully!</p>
            <button
              onClick={() => {
                handleModalClose();
                setSuccessPopup(false);
              }}
              className="bg-green-500 text-white px-6 py-3 rounded mt-4 cursor-pointer transition duration-300 hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 text-center mt-4">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default PlayerForm;
