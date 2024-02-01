import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BidCard = () => {
  const [teams, setTeams] = useState([]);
  const [unsoldPlayersCount, setUnsoldPlayersCount] = useState(0);
  const [soldPlayersCount, setSoldPlayersCount] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        console.error('Error fetching team, player, or sold player details:', error);
      }
    };

    fetchTeamDetails();
  }, []);

  const handleTeamSelect = async (team) => {
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
    return null;
  };

  return (
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

                  {/* Dropdown menu */}
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
  );
};

export default BidCard;
