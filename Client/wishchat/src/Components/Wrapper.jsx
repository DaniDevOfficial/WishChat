
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SimpleAccount } from './SimpleAccount';
import { WholeChat } from './Wholechat';
export function Wrapper() {
  
  const [chattingwith, setChattingwith] = useState("")

  return (
    <Router>
      <Routes>

        <Route path="/" element={<SimpleAccount setChattingwith={setChattingwith}/>} />
        <Route path="/:name" element={<WholeChat />} />

      </Routes>
      {chattingwith}
      asd
    </Router>
  );
};

