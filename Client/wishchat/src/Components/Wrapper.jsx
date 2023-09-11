
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SimpleChat } from './SimpleChat';
import { SimpleAccount } from './SimpleAccount';
import { PersonalChat } from './1on1Chat';
export function Wrapper() {
  

  return (
    <Router>
      <Routes>

        <Route path="/" element={<SimpleAccount />} />
        <Route path="/:name" element={<SimpleChat />} />
        <Route path="/:name/:chatname" element={<PersonalChat />} />

      </Routes>
    </Router>
  );
};

