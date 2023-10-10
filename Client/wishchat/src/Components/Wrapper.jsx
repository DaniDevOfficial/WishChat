
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SimpleAccount } from './SimpleAccount';
import { WholeChat } from './Wholechat';
import { WelcomeSite } from './WelcomeSite';
export function Wrapper() {
  
  const [me, setMe] = useState("")

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeSite setMe={setMe}/>} />
        <Route path="/Account" element={<SimpleAccount setMe={setMe}/>} />
        <Route path="/Chat" element={<WholeChat me={me}/>} />
      </Routes>
    </Router>
  );
};

