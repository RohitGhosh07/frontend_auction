import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import Login from './components/Login';
import Hero from './components/Hero';

import AuctionPage from './components/PlayerForm';

import NavBar from './components/NavBar';
import LLogin from './components/Leaguelogin';
import NavigationMenu from './components/bottomNav';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/db" element={<LLogin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/hero"
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/db" />} />
      </Routes>
    </Router>
  );
};

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('username'); // Check if the user is authenticated

  return isAuthenticated ? (
    <>
  
      {/* Place your protected components here */}
      <NavBar />
      {/* <LLogin /> */}
      <AuctionPage />
      <Hero />
      {/* <NavigationMenu /> */}
      <NavigationMenu />
      {/* <Footer /> */}
    </>
  ) : (
    <Navigate to="/db" />
  );
};

export default App;
