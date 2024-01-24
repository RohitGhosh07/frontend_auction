import React from 'react';
import Navbar from './components/NavBar';
import PlayerForm from './components/PlayerForm';

const App = () => {
  return (
    <div className="">
      <Navbar />

      <div className="pl-60 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://i.ibb.co/KFvWZc6/Untitled-design-1.png")' }}>
        <PlayerForm />
      </div>
    </div>
  );
};

export default App;
