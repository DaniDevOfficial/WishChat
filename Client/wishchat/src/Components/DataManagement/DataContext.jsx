import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import io from 'socket.io-client';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  const fetchData = (snapshot) => {
    const fetchedData = snapshot.val();
    if (fetchedData) {
      const dataArray = Object.values(fetchedData);
      setData(dataArray);
    }
  };

  useEffect(() => {
    const database = getDatabase();
    const dataRef = ref(database);
    onValue(dataRef, fetchData);

    return () => {
    };
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3001/');
    // get data from the backend on "chat message" event
    socket.on('chat message', () => { 
      const database = getDatabase();  
      const dataRef = ref(database);
      onValue(dataRef, fetchData);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}
