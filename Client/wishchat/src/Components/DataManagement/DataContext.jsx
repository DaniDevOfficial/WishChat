import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const dataRef = ref(database);
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const dataArray = Object.values(fetchedData);
        setData(dataArray);
      }
    });
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}
