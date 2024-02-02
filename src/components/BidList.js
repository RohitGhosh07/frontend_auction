import React from 'react';

const BidList = ({ players }) => {
  // Group players by team
  const playersByTeam = players.reduce((acc, player) => {
    acc[player.team] = acc[player.team] || [];
    acc[player.team].push(player);
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap h-screen overflow-x-auto scrollbar  scrollbar-thumb-gray-900 scrollbar-track-gray-100 items-center justify-center mx-auto gap-x-2 rounded">
      {Object.entries(playersByTeam).map(([team, teamPlayers]) => (
        <div key={team} className="w-[300px] rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-md shadow-gray-100">
          <div className="flex items-center justify-between px-2 text-base font-medium text-gray-700">
            <div>{team}</div>
            <div></div>
          </div>
          <div className="mt-4">
            <div className="flex max-h-[400px] w-full flex-col overflow-y-scroll">
              {teamPlayers.map((player) => (
                <button
                  key={player._id}
                  className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-100"
                >
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                    <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-green-900">
                      {player.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
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