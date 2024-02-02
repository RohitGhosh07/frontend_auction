import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import Login from './components/Login';
import Hero from './components/Hero';
import NavigationMenu from './components/bottomNav';
import Footer from './components/Footer';
import PlayerForm from './components/PlayerForm';
import Card from './components/detailCard';
import Register from './components/Register';
import AuctionPage from './components/PlayerForm';
import BidCard from './components/bidCard';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/hero"
          element={
            <PrivateRoute>
              <Outlet />
              {/* <BidCard /> */}
              <AuctionPage />
              <Hero  />
              
              <NavigationMenu />
              {/* <Footer /> */}
            </PrivateRoute>
          }
        />
        
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
      
      {/* <Login />
      <Hero />
      <PlayerForm />
      <Footer />
      <NavigationMenu /> */}
    </Router>

  );
};

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const isAuthenticated = /* Check if user is authenticated */ true; // Replace with your authentication logic

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
