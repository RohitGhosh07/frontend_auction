import React, { useEffect, useState } from 'react';

const BidList = ({ players }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  useEffect(() => {
    // Fetch all players data from the API endpoint
    fetch('http://localhost:5000/api/players/allplayers')
      .then(response => response.json())
      .then(data => setAllPlayers(data))
      .catch(error => console.error('Error fetching all players data:', error));
    // Fetch all teams data from the API endpoint
    fetch('http://localhost:5000/api/teams/allteams')
      .then(response => response.json())
      .then(data => setAllTeams(data))
      .catch(error => console.error('Error fetching all teams data:', error));

  }, []);

  // Group players by team
  const playersByTeam = players.reduce((acc, player) => {
    acc[player.team] = acc[player.team] || [];
    acc[player.team].push(player);
    return acc;
  }, {});
  // Get the image of the team based on the team name
  const getTeamImage = (teamName) => {
    const team = allTeams.find(t => t.name === teamName);
    return team ? team.image : ''; // Return the image link if found, otherwise an empty string
  };

  const getPlayerImage = (playerName) => {
    const player = allPlayers.find(p => p.name === playerName);
    return player ? player.team : ''; // Return the image link if found, otherwise an empty string
  };

  return (
    <div className="flex flex-wrap h-screen overflow-x-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 items-center justify-center mx-auto gap-x-2 rounded">
    {Object.entries(playersByTeam).map(([team, teamPlayers]) => (
      <div key={team} className="w-[300px] rounded-xl border border-gray-200 bg-white bg-opacity-10 py-4 px-2 shadow-md shadow-gray-100">
        <div className="flex items-center justify-between px-2 text-base font-medium text-gray-100">
          <div>{team}</div>
          <img
            src={getTeamImage(team)}
            alt={team}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div></div>
        </div>
        <div className="mt-4">
          <div className="flex max-h-[400px] w-full flex-col overflow-y-scroll">
            {teamPlayers.map((player) => (
              <button
                key={player._id}
                className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-indigo-500"
              >
                <div className="flex h-12 w-12 items-center rounded-lg  group-hover:bg-green-200">
                  <img
                    src={getPlayerImage(player.name)}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col items-start justify-between font-light text-gray-100">
                  <p className="text-[15px]">{player.name}</p>
                  <p className="text-[15px]">{player.biddingPrice}</p>
                  {/* Add any other player details you want to display */}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default BidList;
