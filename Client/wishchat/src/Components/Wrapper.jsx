
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SimpleAccount } from './SimpleAccount';
import { WholeChat } from './Wholechat';
import { WelcomeAnimation } from './WelcomeAnimation';
export function Wrapper() {
  
  const [me, setMe] = useState("")

  return (
    <Router>
      <WelcomeAnimation /> 
      <Routes>
        <Route path="/" element={<SimpleAccount setMe={setMe}/>} />
        <Route path="/Chat" element={<WholeChat me={me}/>} />
      </Routes>
    </Router>
  );
};

