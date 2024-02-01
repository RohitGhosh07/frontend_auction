import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AuctionPage = () => {
  const [teams, setTeams] = useState([]);
  const [unsoldPlayersCount, setUnsoldPlayersCount] = useState(0);
  const [soldPlayersCount, setSoldPlayersCount] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [biddingPrice, setBiddingPrice] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTeamPlayerForm, setSelectedTeamPlayerForm] = useState('');
  const [teamsPlayerForm, setTeamsPlayerForm] = useState([]);
  const [errorPopup, setErrorPopup] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [submittedPlayers, setSubmittedPlayers] = useState([]);
  const [playersAlreadyBid, setPlayersAlreadyBid] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamUrl = 'http://localhost:5000/api/teams/allteams';
        const responseTeam = await axios.get(teamUrl);
        setTeams(responseTeam.data);

        const playersUrl = 'http://localhost:5000/api/players/allplayers';
        const responsePlayers = await axios.get(playersUrl);

        const unsoldPlayers = responsePlayers.data.filter(player => player.state === 'U');
        const soldPlayers = responsePlayers.data.filter(player => player.state === 'S');

        setUnsoldPlayersCount(unsoldPlayers.length);
        setSoldPlayersCount(soldPlayers.length);
      } catch (error) {
        console.error('Error fetching team, player, or updating team balance:', error);
      }
    };

    fetchTeamDetails();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = 'http://localhost:5000/api/teams/allteams';
        const response = await axios.get(apiUrl);
        setTeamsPlayerForm(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const apiUrl = 'http://localhost:5000/api/players/allplayers';
        const response = await axios.get(apiUrl);

        const updatedPlayers = response.data.map(player => ({
          ...player,
          isUnsold: player.state === 'U' || player.state === 'F',
        }));

        setPlayers(updatedPlayers);
        setSelectedPlayer(updatedPlayers[currentPlayerIndex]);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [currentPlayerIndex]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setIsDropdownOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const calculateAmountLeft = () => {
    if (selectedTeam) {

      return selectedTeam.balance;
    }
    // console.log(selectedTeam);
    return null;
  };

  // ...

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedPlayer.isUnsold) {
    setErrorPopup('This player is already bid by another team.');
    return;
  }

  try {
    setLoading(true);
    const apiUrl = 'http://localhost:5000/api/players/biddings';

    const body = {
      name: selectedPlayer.name,
      biddingPrice,
      team: selectedTeamPlayerForm,
    };

    const response = await axios.post(apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // const { updatedBalance, updatedTeam } = response.data;

    setConfirmation(response.data);
    setSuccessPopup(true);
    setBiddingPrice('');
    setCurrentPlayerIndex(currentPlayerIndex + 1);
    setSubmittedPlayers([...submittedPlayers, selectedPlayer._id]);
    setPlayersAlreadyBid([...playersAlreadyBid, selectedPlayer._id]);

    setPlayers((updatedPlayers) =>
      updatedPlayers.map((player) =>
        player._id === selectedPlayer._id
          ? { ...player, isUnsold: false, state: 'S' }
          : player
      )
    );

    // setTeams((updatedTeams) =>
    //   updatedTeams.map((team) =>
    //     team._id === updatedTeam._id
    //       ? { ...team, balance: updatedBalance }
    //       : team
    //   )
    // );

    // Update the local state with the updated balance
    // setSelectedTeam((prevTeam) => ({ ...prevTeam, balance: updatedBalance }));

    // Do not perform a window reload here; it might disrupt the React application flow
    // Reload the page
    window.location.reload();
  } catch (error) {
    console.error('Error submitting bid:', error);

    if (axios.isAxiosError(error) && !error.response) {
      setErrorPopup('Network error. Please check your internet connection.');
    } else if (error.response) {
      if (error.response.status === 400) {
        setErrorPopup('Invalid data. Please check your input.');
      } else if (error.response.status === 401) {
        setErrorPopup('Unauthorized. Please log in.');
      } 
      else if(error.response.status === 601){
        setErrorPopup('Team Balance Insufficient');
      }
      else {
        setErrorPopup('An error occurred. Please try again later.');
      }
    } else {
      setErrorPopup('An error occurred. Please try again later.');
    }
  } finally {
    setLoading(false);
  }
  localStorage.removeItem('playerFormState');
};

// ...


  const handlePlayerChange = (event) => {
    const index = event.target.value;
    const selectedPlayerId = players[index]._id;

    if (!players[index].isUnsold) {
      setErrorPopup('This player is already bid by another team.');
      return;
    }

    setSelectedPlayer(players[index]);
  };

  const handleModalClose = () => {
    setConfirmation(null);
    setErrorPopup('');
    setSuccessPopup(false);
  };

  return (
    <>
      <div>
        {/* Suggestions card */}
        <div className="flex flex-wrap mb-2">
          {/* Card 1: Amount left dropdown */}
          <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
            <div className="bg-green-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4">
                  <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
                </div>
                <div className="flex-1 text-right">
                  <h5 className="text-white">Amount left</h5>
                  <div className="relative inline-block text-left" ref={dropdownRef}>
                    <div>
                      <button
                        type="button"
                        onClick={handleToggleDropdown}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        {selectedTeam ? selectedTeam.name : 'Select Team'}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {isDropdownOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="py-1" role="none">
                          {teams.map((team) => (
                            <button
                              key={team._id}
                              onClick={() => handleTeamSelect(team)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              {team.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white text-3xl">
                    {calculateAmountLeft() !== null ? (
                      <>
                        {calculateAmountLeft()}
                        <span className="text-green-400">
                          <i className="fas fa-caret-down"></i>
                        </span>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Total Unsold Players */}
          <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
            <div className="bg-blue-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4">
                  <i className="fas fa-users fa-2x fa-fw fa-inverse"></i>
                </div>
                <div className="flex-1 text-right">
                  <h5 className="text-white">Total Unsold Players</h5>
                  <h3 className="text-white text-3xl">{unsoldPlayersCount} <span className="text-blue-400"></span></h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Total Sold Players */}
          <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
            <div className="bg-orange-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4">
                  <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
                </div>
                <div className="flex-1 text-right pr-1">
                  <h5 className="text-white">Total Sold Players</h5>
                  <h3 className="text-white text-3xl">{soldPlayersCount} <span className="text-orange-400"></span></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex -mb-12 justify-center items-center flex-wrap min-h-screen" id="bidding">
        <div className="flex-1 text-center p-4">
          {selectedPlayer && (
            <div className="mb-4">
              <img
                src={selectedPlayer.team}
                alt={`${selectedPlayer.name}`}
                className="w-64 h-64 object-cover mx-auto rounded-full shadow-lg"
              />
              <p className="mt-2 text-gray-300 text-lg font-semibold">{`${selectedPlayer.name} `}</p>
            </div>
          )}
        </div>

        <div className="flex-1 max-w-md p-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Select Player:</label>
              <select
                value={players.findIndex(player => player._id === selectedPlayer._id)}
                onChange={handlePlayerChange}
                className="mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                disabled={!selectedPlayer || !selectedPlayer.isUnsold}
              >
                {players.map((player, index) => (
                  <option
                    key={player._id}
                    value={index}
                    disabled={!player.isUnsold}
                  >
                    {`${player.name} `}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Bidding Price:</label>
              <input
                type="number"
                value={biddingPrice}
                onChange={(e) => setBiddingPrice(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Select Team:</label>
              <select
                value={selectedTeamPlayerForm}
                onChange={(e) => setSelectedTeamPlayerForm(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Team</option>
                {teamsPlayerForm.map((team) => (
                  <option key={team._id} value={team.name}>
                    {team.name}
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
    </>
  );
};

export default AuctionPage;
