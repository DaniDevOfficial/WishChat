import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function FetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const dataRef = ref(database); 
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const dataArray = Object.values(fetchedData);
        setData(dataArray);
        
        localStorage.setItem('fetchedData', JSON.stringify(dataArray));
      }
    });
  }, []);

  return (
    <div>
    </div>
  );
}

export default FetchData;
