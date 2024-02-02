import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BidCard = () => {
  const [teams, setTeams] = useState([]);
  const [unsoldPlayersCount, setUnsoldPlayersCount] = useState(0);
  const [soldPlayersCount, setSoldPlayersCount] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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
      <div class="min-w-screen min-h-screen  flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div class="w-full max-w-6xl rounded  shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div class="md:flex items-center -mx-10">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div class="relative">
                <img src={selectedPlayer.team} class="w-full relative z-10" alt="" />
                <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
              <div class="mb-10">
                <h1 class="font-bold uppercase text-2xl mb-5">Mens's Ragged Waterproof Jacket</h1>
                <p class="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis... <a href="#" class="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i class="mdi mdi-arrow-right"></i></a></p>
              </div>
              <div>
                <div class="inline-block align-bottom mr-5">
                  <span class="text-2xl leading-none align-baseline">$</span>
                  <span class="font-bold text-5xl leading-none align-baseline">59</span>
                  <span class="text-2xl leading-none align-baseline">.99</span>
                </div>
                <div class="inline-block align-bottom">
                  <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i class="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCard;
