import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LLogin = () => {
    const [loginData, setLoginData] = useState({
        leagueID: '',
    });
  
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!loginData.leagueID) {
          setErrorMessage('League ID is required.');
          return;
        }
    
        try {
          const response = await axios.post('http://localhost:5000/api/auth/retrieve', {
            leagueID: loginData.leagueID,
          });
    
          // Assuming your backend responds with a message property
          if (response.data.message) {
            setErrorMessage('');
            console.log('Login successful!');
            navigate('/login');
            window.localStorage.setItem('leagueid', loginData.leagueID);
          } else {
            setErrorMessage('Invalid leagueid.');
          }
        } catch (error) {
          console.error('Login failed:', error.response ? error.response.data : error.message);
          setErrorMessage('An error occurred during login.');
        }
      };
      
      
  


    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img
                    src="https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full h-100">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12" onSubmit={handleLogin}>
                       Enter the League ID to GET IN✨
                    </h1>

                    <form className="mt-6" action="#" method="POST">
                        <div>
                            <label className="block text-gray-700">League ID</label>
                            <input
                                type="text"
                                name="leagueID"
                                id="leagueID"
                                placeholder="Enter League ID"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoFocus
                                autoComplete="required"
                                value={loginData.leagueID}
                                onChange={handleChange}
                            />
                        </div>
                        

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                        >
                            Log In
                        </button>

                    </form>
                    {errorMessage && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-md shadow-lg">
                            {errorMessage}
                        </div>
                    )}

                    <hr className="my-6 border-gray-300 w-full" />

                    
                </div>
            </div>
        </section>
    );
};

export default LLogin;
