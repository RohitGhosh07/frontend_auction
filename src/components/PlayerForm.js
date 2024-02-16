import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Landing from './Landing';
import Balance from './Wallet';
import Confetti from 'react-dom-confetti';
import confetti from 'canvas-confetti';


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
  const [latestBid, setLatestBid] = useState([]);
  const [errorPopup, setErrorPopup] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [csuccessPopup, setcSuccessPopup] = useState(false);
  const [submittedPlayers, setSubmittedPlayers] = useState([]);
  const [playersAlreadyBid, setPlayersAlreadyBid] = useState([]);
  const [isHovered, setIsHovered] = useState(false);


  const latestbid = localStorage.getItem('name');
  const latestprice = localStorage.getItem('price');
  const category = localStorage.getItem('price');
  const skip = localStorage.getItem('skip');

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const updateSelectedPlayer = (player) => {

    setSelectedPlayer(player);
  };
  const ConfettiEffect = ({ active }) => {
    useEffect(() => {
      if (active) {
        const end = Date.now() + 15 * 1000;

        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#bb0000', '#ffffff'],
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#bb0000', '#ffffff'],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };

        frame();
      }
    }, [active]);

    return null;
  };
  useEffect(() => {
    if (errorPopup === 'CONGRATS you have already completed quota for player selection') {
      const end = Date.now() + 15 * 1000;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#bb0000', '#ffffff'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#bb0000', '#ffffff'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [errorPopup]);

  const shufflePlayers = () => {
    const unsoldPlayers = players.filter(player => player.state === 'U');
    const shuffledPlayers = [...unsoldPlayers];
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('All players are completed');
      // <ConfettiEffect active={true}/>
      return;
    }
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);
    setSelectedPlayer(shuffledPlayers[0]);
    // Remove an item from localStorage
    window.localStorage.removeItem('category');

  };

  const mid = () => {
    const unsoldPlayers = players.filter(player => player.state === 'U' && player.category === 'mid');

    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('This category players are completed');
      return;
    }

    const shuffledPlayers = [...unsoldPlayers];
    window.localStorage.setItem('category', selectedPlayer.category);

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);
    setSelectedPlayer(shuffledPlayers[0]);
  };

  const back = () => {
    const unsoldPlayers = players.filter(player => player.state === 'U' && player.category == 'back');
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('This category players are completed');
      return;
    }
    const shuffledPlayers = [...unsoldPlayers];
    window.localStorage.setItem('category', selectedPlayer.category);

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);
    setSelectedPlayer(shuffledPlayers[0]);
  };

  const forward = () => {
    const unsoldPlayers = players.filter(player => player.state === 'U' && player.category == 'forward');
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('This category players are completed');
      return;
    }
    const shuffledPlayers = [...unsoldPlayers];
    window.localStorage.setItem('category', selectedPlayer.category);

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);
    setSelectedPlayer(shuffledPlayers[0]);
  };

  const skippedPlayers = (e) => {
    e.preventDefault();

    const unsoldPlayers = players.filter(player => player.state === 'Skipped');
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('This category players are completed');
      return;
    }
    const shuffledPlayers = [...unsoldPlayers];
    // window.localStorage.setItem('skip', selectedPlayer.state);

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);

    setSelectedPlayer(shuffledPlayers[0]);
    window.localStorage.removeItem('category');


  };
  const forwardskipped = () => {
    const unsoldPlayers = players.filter(player => player.state === 'Skipped' && player.category == 'forward');
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('This category players are completed');
      return;
    }
    const shuffledPlayers = [...unsoldPlayers];
    window.localStorage.setItem('category', selectedPlayer.category);
    window.localStorage.setItem('skip', selectedPlayer.state);

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);
    setSelectedPlayer(shuffledPlayers[0]);
  };
  const midskipped = () => {
    const unsoldPlayers = players.filter(player => player.state === 'Skipped' && player.category == 'mid');
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('This category players are completed');
      return;
    }
    const shuffledPlayers = [...unsoldPlayers];
    window.localStorage.setItem('category', selectedPlayer.category);
    window.localStorage.setItem('skip', selectedPlayer.state);

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);
    setSelectedPlayer(shuffledPlayers[0]);
  };
  const backskipped = () => {
    const unsoldPlayers = players.filter(player => player.state === 'Skipped' && player.category == 'back');
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('This category players are completed');
      return;
    }
    const shuffledPlayers = [...unsoldPlayers];
    window.localStorage.setItem('category', selectedPlayer.category);
    window.localStorage.setItem('skip', selectedPlayer.state);

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Set the players state with shuffled unsold players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      unsoldPlayers.forEach((unsoldPlayer, index) => {
        const playerIndex = prevPlayers.findIndex(player => player._id === unsoldPlayer._id);
        updatedPlayers[playerIndex] = shuffledPlayers[index];
      });
      return updatedPlayers;
    });

    setCurrentPlayerIndex(0);
    setSelectedPlayer(shuffledPlayers[0]);
  };

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
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
        const skippedPlayers = responsePlayers.data.filter(player => player.state === 'Skipped');
        // console.log(skippedPlayers)
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
    const fetchLatestBid = async () => {
      try {
        const apiUrl = 'http://localhost:5000/api/players/biddings/latestbid';
        const response = await axios.get(apiUrl);
        setLatestBid(response.data);
      } catch (error) {
        console.error('Error fetching latest bid:', error);
      }
    };

    fetchLatestBid();
  }, []);

  // const UndoLatestBidButton = () => {
  const undoLatestBid = async () => {
    try {
      // Make an HTTP request to delete the latest bid
      const response = await axios.post('http://localhost:5000/api/players/deleteLatestBid')

      console.log('Latest bid deleted successfully:', response.data);
      // Handle success, if needed
    } catch (error) {
      console.error('Error undoing latest bid:', error);
      // Handle error, if needed
    }
  };
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const apiUrl = 'http://localhost:5000/api/players/allplayers';
        const response = await axios.get(apiUrl);

        const updatedPlayers = response.data.map(player => ({
          ...player,
          isUnsold: player.state === 'U' || player.state === 'Skipped',
        }));

        setPlayers(updatedPlayers);
        setSelectedPlayer(updatedPlayers[currentPlayerIndex]);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [currentPlayerIndex]);

  // const handleTeamSelect = (team) => {
  //   setSelectedTeam(team);
  //   setIsDropdownOpen(false);
  // };

  // const handleToggleDropdown = () => {
  //   setIsDropdownOpen((prevState) => !prevState);
  // };

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

  // const calculateAmountLeft = () => {
  //   if (teamsPlayerForm) {

  //     return teamsPlayerForm.balance;
  //   }
  //   // console.log(selectedTeam);
  //   return null;
  // };

  // ...
  const skipped = async () => {
    // Continue with the bid submission if the current bidding price is valid
    // if (!selectedPlayer.isUnsold) {
    //   setErrorPopup('This player is already bid by another team.');
    //   return;
    // }
    try {
      setLoading(true);
      const apiUrl = 'http://localhost:5000/api/players/skip';

      const body = {
        name: selectedPlayer.name,

      };
      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Call the function to select a new random unsold player
      selectSkippedRandomPlayer();
      setSelectedPlayer(null);


    } catch (error) {
      console.error('Error submitting bid:', error);

      if (axios.isAxiosError(error) && !error.response) {
        setErrorPopup('Network error. Please check your internet connection.');
      } else if (error.response) {
        if (error.response.status === 400) {
          setErrorPopup('Invalid data. Please check your input.');
        } else if (error.response.status === 401) {
          setErrorPopup('Unauthorized. Please log in.');
        } else if (error.response.status === 601) {
          setErrorPopup('Team Balance Insufficient');
        } else if (error.response && error.response.status === 602) {
          setErrorPopup('CONGRATS you have already completed quota for player selection');
          return;

        } else {
          setErrorPopup('An error occurred. Please try again later.');
        }
      } else {
        setErrorPopup('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }

    // Remove the playerFormState from localStorage
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const unsoldPlayers = players.filter(player => player.state === 'U' || player.state === 'Skipped');
    // Check if unsoldPlayers is empty
    if (unsoldPlayers.length === 0) {
      // Show a popup indicating that no players are available for the specified category
      setErrorPopup('Allplayer are bidded');
      return;
    } else {

      // Continue with the bid submission if the current bidding price is valid
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
        const allBiddingsResponse = await axios.get('http://localhost:5000/api/players/biddings/allbiddings');
        const maxBid = Math.max(...allBiddingsResponse.data.map(bid => bid.biddingPrice));
        setConfirmation(response.data);
        if (biddingPrice >= maxBid) {
          setcSuccessPopup(true);
        } else {
          setSuccessPopup(true);
        }
        setBiddingPrice('');
        setCurrentPlayerIndex(currentPlayerIndex);
        setSubmittedPlayers([...submittedPlayers, selectedPlayer._id]);
        setPlayersAlreadyBid([...playersAlreadyBid, selectedPlayer._id]);

        // setPlayers((updatedPlayers) =>
        //   updatedPlayers.map((player) =>
        //     player._id === selectedPlayer._id
        //       ? { ...player, isUnsold: false, state: 'S' }
        //       : player
        //   )
        // );



        window.localStorage.setItem('name', selectedPlayer.name);
        window.localStorage.setItem('price', biddingPrice);
        window.localStorage.setItem('previousBidPlayerCategory', selectedPlayer.category);

        // Call the function to select a new random unsold player
        selectRandomUnsoldPlayer();
        setSelectedPlayer(null);

      } catch (error) {
        console.error('Error submitting bid:', error);

        if (axios.isAxiosError(error) && !error.response) {
          setErrorPopup('Network error. Please check your internet connection.');
        } else if (error.response) {
          if (error.response.status === 400) {
            setErrorPopup('Invalid data. Please check your input.');
          } else if (error.response.status === 401) {
            setErrorPopup('Unauthorized. Please log in.');
          } else if (error.response.status === 601) {
            setErrorPopup('Team Balance Insufficient');
          } else if (error.response && error.response.status === 602) {
            setErrorPopup('CONGRATS you have already completed quota for player selection');
            return;

          } else {
            setErrorPopup('An error occurred. Please try again later.');
          }
        } else {
          setErrorPopup('An error occurred. Please try again later.');
        }
      } finally {
        setLoading(false);
      }

      // Remove the playerFormState from localStorage
      localStorage.removeItem('playerFormState');
    }
  };


  const selectRandomUnsoldPlayer = async () => {
    try {
      const apiUrl = 'http://localhost:5000/api/players/allplayers';
      const response = await axios.get(apiUrl);

      let unsoldPlayers = response.data.filter((player) => player.state === 'U');

      // Check if a category is defined in localStorage
      const localStorageCategory = localStorage.getItem('category');

      // If a category is defined, filter unsold players based on the category
      if (localStorageCategory) {
        unsoldPlayers = unsoldPlayers.filter((player) => player.category === localStorageCategory);
      }

      // Select a random unsold player from the list
      const nextUnsoldPlayer = unsoldPlayers[Math.floor(Math.random() * unsoldPlayers.length)];

      // Set the selected player in your component state
      setSelectedPlayer({ ...nextUnsoldPlayer, isUnsold: true });
    } catch (error) {
      console.error('Error fetching unsold player:', error);
    }
  };
  const selectSkippedRandomPlayer = async () => {
    try {
      const apiUrl = 'http://localhost:5000/api/players/allplayers';
      const response = await axios.get(apiUrl);

      let unsoldPlayers = response.data.filter((player) => player.state === 'Skipped');

      // Check if a category is defined in localStorage
      const localStorageCategory = localStorage.getItem('category');

      // If a category is defined, filter unsold players based on the category
      if (localStorageCategory) {
        unsoldPlayers = unsoldPlayers.filter((player) => player.category === localStorageCategory);
      }

      // Select a random unsold player from the list
      const nextUnsoldPlayer = unsoldPlayers[Math.floor(Math.random() * unsoldPlayers.length)];

      // Set the selected player in your component state
      setSelectedPlayer({ ...nextUnsoldPlayer });
    } catch (error) {
      console.error('Error fetching unsold player:', error);
    }
  };



  const handleTeamSelection = (teamName) => {
    // Find the selected team from the array
    const team = teamsPlayerForm.find((team) => team.name === teamName);
    setSelectedTeam(team);
  };


  // ...



  const handleModalClose = () => {
    setConfirmation(null);
    setErrorPopup('');
    setSuccessPopup(false);
    setcSuccessPopup(false);
  };
  useEffect(() => {
    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function () {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [csuccessPopup]);
  const fetchUnsoldPlayersCount = async () => {
    try {
      const playersUrl = 'http://localhost:5000/api/players/allplayers';
      const responsePlayers = await axios.get(playersUrl);

      const unsoldPlayers = responsePlayers.data.filter(player => player.state === 'U');
      setUnsoldPlayersCount(unsoldPlayers.length);
    } catch (error) {
      console.error('Error fetching unsold players count:', error);
    }
  };
  const fetchSoldPlayersCount = async () => {
    try {
      const playersUrl = 'http://localhost:5000/api/players/allplayers';
      const responsePlayers = await axios.get(playersUrl);

      const soldPlayers = responsePlayers.data.filter(player => player.state === 'S');
      setSoldPlayersCount(soldPlayers.length);
    } catch (error) {
      console.error('Error fetching sold players count:', error);
    }
  };



  return (
    <>

      <Landing
        shufflePlayers={shufflePlayers}
        mid={mid}
        back={back}
        forward={forward}
        skippedPlayers={skippedPlayers}
        forwardskipped={forwardskipped}
        midskipped={midskipped}
        backskipped={backskipped}
      />
      {selectedPlayer && (
        <h1 className="text-4xl text-white flex justify-center mt-7 font-bold mb-4 uppercase tracking-wider bg-slate-100 bg-opacity-20 backdrop-blur-md rounded-md shadow-md" id="playerprofile">
          {selectedPlayer.category} PLAYERS </h1>
      )}
      <div class="min-w-screen min-h-screen  flex items-center p-5 lg:p-10 overflow-hidden relative">
        {/* Alerts */}
        <div className="absolute top-20 right-0 z-40">



          <div className="text-center py-4 lg:px-4">
            <div className="p-2 bg-amber-300 bg-opacity-50 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <button
                className="flex rounded-full bg-yellow-200 bg-opacity-15 uppercase px-2 py-1 text-xs font-bold mr-3 hover:bg-red-600"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={undoLatestBid}
              >
                {isHovered ? 'Undo Bid ↩️' : 'Latest Bid ❕❕'}
              </button>
              {latestBid && latestBid.length > 0 && (
                <span className="font-semibold mr-2 text-left flex-auto">
                  {latestBid[0].name} 🢂 {latestBid[0].team}
                </span>
              )}

            </div>
          </div>
          <div className="text-center py-4 lg:px-4">
            <div className="p-2 bg-amber-300 bg-opacity-50 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <button
                className="flex rounded-full bg-yellow-200 bg-opacity-15 uppercase px-2 py-1 text-xs font-bold mr-3 hover:bg-slate-500"
                onClick={fetchUnsoldPlayersCount}
              >
                Players Available
              </button>
              <span className="font-semibold mr-2 text-left flex-auto">{unsoldPlayersCount}</span>
            </div>
          </div>
          <div className="text-center py-4 lg:px-4">
            <div className="p-2 bg-amber-300 bg-opacity-50 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <button
                className="flex rounded-full bg-yellow-200 bg-opacity-15 uppercase px-2 py-1 text-xs font-bold mr-3 hover:bg-slate-500"
                onClick={fetchSoldPlayersCount}
              >
                Sold Players
              </button>
              <span className="font-semibold mr-2 text-left flex-auto">{soldPlayersCount}</span>
            </div>
          </div>
          {selectedTeam && (
            <div className="text-center py-4 lg:px-4">
              <div className="p-2 bg-amber-300 bg-opacity-50 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-yellow-200 bg-opacity-15 uppercase px-2 py-1 text-xs font-bold mr-3">
                  Balance
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">{selectedTeam.balance}</span>
              </div>
            </div>
          )}
        </div>
        {/* End of Alerts */}
        <div class="w-full max-w-6xl rounded  shadow-xl p-10 lg:p-20 mx-auto text-gray-200 relative md:text-left">

          <div class="md:flex items-center -mx-10 relative">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div class="relative">
                {selectedPlayer && (
                  <img src={selectedPlayer.team} class="w-full relative z-10" alt="" />
                )}
                <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
              <div class="mb-10">
                {selectedPlayer && (
                  <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">{`${selectedPlayer.name} `}</h1>)}


                {selectedPlayer && (
                  <h6 class="my-4 text-1xl md:text-5xl text-white opacity-75 leading-tight text-center md:text-left">
                    Age: {selectedPlayer.age} <br /><br />
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-300 to-yellow-200">
                      Skills: {selectedPlayer.skills}  <br /><br />
                    </span>

                    Category:{selectedPlayer.category}
                  </h6>)}



              </div>
              <div>

                <div class="inline-block align-bottom mr-5">
                  <div class="relative h-10 w-full min-w-[200px]">
                    <input
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-yellow-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      value={biddingPrice}
                      onChange={(e) => setBiddingPrice(e.target.value)}
                    />
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-yellow-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-yellow-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-yellow-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Bidding Price
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-gray-100">Select Team:</label>
                      <select
                        value={selectedTeamPlayerForm}
                        onChange={(e) => {
                          setSelectedTeamPlayerForm(e.target.value);
                          handleTeamSelection(e.target.value);
                        }}
                        className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-600"
                      >
                        <option className="text-black" value="">Select Team</option>
                        {teamsPlayerForm.map((team) => (
                          <option
                            className="text-black"
                            key={team._id}
                            value={team.name}
                          >
                            {team.name}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>
                </div>


                <div class="inline-block align-bottom">

                  <div
                    className="relative inline-block text-lg group"
                    onClick={handleSubmit}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Buy Now</span>
                    </span>
                    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                  </div>


                </div>



              </div>

            </div>
          </div>



        </div>
        <div
          className="relative inline-block text-lg group"
          onClick={skipped}
          style={{ cursor: 'pointer' }}
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Skip</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </div>

      </div>


      <h1 className="text-4xl text-white flex justify-center font-bold mb-4 uppercase tracking-wider bg-slate-100 bg-opacity-20 backdrop-blur-md rounded-md shadow-md" id="analytics">
        Wallet & Analytics
      </h1>

      {errorPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center z-20 items-center bg-gray-800 bg-opacity-75">
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
        <div className="fixed top-0 left-0 w-full z-20 h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">SUCCESS!!</h2>
            <p>Bid submitted successfully!</p>
            <button
              onClick={() => {
                handleModalClose();
                setSuccessPopup(false);
                <Confetti active={csuccessPopup} config={{ angle: 90, spread: 360, startVelocity: 40, elementCount: 70, dragFriction: 0.12, duration: 3000 }} />
              }}
              className="bg-green-500 text-white px-6 py-3 rounded mt-4 cursor-pointer transition duration-300 hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {csuccessPopup && (
        <div className="fixed top-0 left-0 w-full z-20 h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow relative">
            <h2 className="text-xl font-bold mb-2">CONGRATULATIONS!!</h2>
            <p>This is the highest Bid till now submitted successfully!</p>
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
      console.log(biddingPrice)
      <div  >
        <Balance
          biddingPrice={biddingPrice}
          updateSelectedPlayer={updateSelectedPlayer}
        />

      </div >


    </>
  );
};

export default AuctionPage;
