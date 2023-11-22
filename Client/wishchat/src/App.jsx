import React, { useEffect } from 'react';
import { Wrapper } from './Components/Wrapper';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001/'); // Connect to Socket.IO server

function App() {
  useEffect(() => {
    if (socket.connected) {
      console.log('Already connected to Socket.IO server');
      return;
    }
    console.log('Connecting to Socket.IO server...');
    socket.connect();

    return () => {
      console.log('Disconnecting from Socket.IO server...');
      socket.disconnect();
    };
  }, []);


  return (
    <div className="App">
      <Wrapper />
    </div>
  );
}

export default App;
