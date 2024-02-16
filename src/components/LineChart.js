import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const LineChartCard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const soldPlayersResponse = await fetch('http://localhost:5000/api/players/biddings/allbiddings');
            const soldPlayersData = await soldPlayersResponse.json();

            const unsoldPlayersResponse = await fetch('http://localhost:5000/api/players/allplayers');
            const unsoldPlayersData = await unsoldPlayersResponse.json();

            // Filter unsold players based on 'U' state
            const filteredUnsoldPlayers = unsoldPlayersData.filter(player => player.state === 'U');

            // Calculate total players bought by each team
            const totalPlayersBoughtByTeam = {};
            soldPlayersData.forEach(player => {
                totalPlayersBoughtByTeam[player.team] = (totalPlayersBoughtByTeam[player.team] || 0) + 1;
            });

            // Calculate the remaining unsold players
            const totalUnsoldPlayers = filteredUnsoldPlayers.length;

            // Format data for the chart
            const teamLabels = Object.keys(totalPlayersBoughtByTeam);
            const data = teamLabels.map(team => totalPlayersBoughtByTeam[team]);
            data.push(totalUnsoldPlayers);

            setChartData({
                labels: [...teamLabels, 'Unsold Players'],
                data,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);


  const options = {
    chart: {
      height: 350,
      type: 'pie',
    },
    labels: chartData.labels,
    title: {
      text: 'Total Players Bought by Each Team and Unsold Players',
      align: 'center',
    },
  };

  return (
    <div className="min-h-screen flex items-center overflow-hidden justify-center mx-auto px-5 py-5">
      <div className="text-gray-500 overflow-hidden rounded shadow-xl py-5 px-5 w-full">
        {chartData.labels.length > 0 ? (
          <Chart options={options} series={chartData.data} type="pie" height={350} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default LineChartCard;
