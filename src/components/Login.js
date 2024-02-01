import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    


    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          // Make a GET request to your API endpoint
          const response = await axios.get('http://localhost:5000/api/auth/users');
    
          // Define the expected structure of the response
          const expectedStructure = [
            {
              "_id": "",
              "username": "",
              "password": "",
              "__v": 0
            }
          ];
    
          // Check if the response data matches the expected structure
          if (
            Array.isArray(response.data) &&
            response.data.length > 0 &&
            response.data.every((item) =>
              Object.keys(item).every(
                (key) => expectedStructure[0][key] !== undefined
              )
            )
          ) {
            // The response data matches the expected structure
            console.log('Login successful!');
    
            // Navigate to another page (replace '/dashboard' with your desired route)
            navigate('/hero');
          } else {
            // The response data does not match the expected structure
            console.error('Login failed: Unexpected response format');
            // Display an error message to the user
          }
        } catch (error) {
          // Handle request failure
          console.error(
            'Login failed:',
            error.response ? error.response.data : error.message
          );
          // Display an error message to the user
        }
      };

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img
                    src="https://www.indiansuperleague.com/static-assets/waf-images/56/0f/bb/16-9/xgHMzFewxL.png?v=100.38&w=1200"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full h-100">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12" onSubmit={handleLogin}>
                        Log in to your account
                    </h1>

                    <form className="mt-6" action="#" method="POST">
                        {/* <div>
                            <label className="block text-gray-700">League ID</label>
                            <input
                                type="text"
                                name="leagueId"
                                id="leagueId"
                                placeholder="Enter League ID"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoFocus
                                autoComplete="required"
                            />
                        </div> */}
                        <div>
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter Username"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoFocus
                                autoComplete="required"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                minLength=""
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required
                            />
                        </div>

                        {/* <div className="text-right mt-2">
                            <a
                                href="#"
                                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                            >
                                Forgot Password?
                            </a>
                        </div> */}

                        <button
                            type="button"  
                            onClick={handleLogin}
                            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                        >
                            Log In
                        </button>

                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    {/* <button
                        type="button"
                        className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                    >
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                className="w-6 h-6"
                                viewBox="0 0 48 48"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className="w-6 h-6"
                                    viewBox="0 0 48 48"
                                >
                                    <defs>
                                        <path
                                            id="a"
                                            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                                        />
                                    </defs>
                                    <clipPath id="b">
                                        <use xlinkHref="#a" overflow="visible" />
                                    </clipPath>
                                    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                                    <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                                    <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                                    <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                                </svg>
                            </svg>
                            <span className="ml-4">Log in with Google</span>
                        </div>
                    </button>

                    <p className="mt-8">
                        Need an account?{' '}
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                            Create an account
                        </a>
                    </p> */}
                </div>
            </div>
        </section>
    );
};

export default Login;
