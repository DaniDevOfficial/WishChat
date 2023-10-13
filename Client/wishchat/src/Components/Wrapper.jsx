
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SimpleAccount } from './SimpleAccount';
import { WholeChat } from './Wholechat';
import { WelcomeSite } from './WelcomeSite';
import { SimpleSignIn } from './SimpleSignIn';
import { SimpleSignUp } from './SimpleSignUp';
export function Wrapper() {
  
  const [me, setMe] = useState("")

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  
  return (
      <Routes>
        <Route path="/" element={<WelcomeSite setMe={setMe}/>} />
        <Route path="/SignIn" element={<SimpleSignIn setMe={setMe}/>} />
        <Route path="/SignUp" element={<SimpleSignUp setMe={setMe}/>} />
        <Route path="/Account" element={<SimpleAccount setMe={setMe}/>} />
        <Route path="/Chat" element={<WholeChat me={me}/>} />
      </Routes>
  );
};

