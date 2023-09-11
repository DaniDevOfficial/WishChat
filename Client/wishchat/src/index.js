import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// eslint-disable-next-line no-unused-vars
import firebaseApp from './firebaseConfig';
import { DataProvider } from './Components/DataManagement/DataContext';


ReactDOM.render(
        <DataProvider>
            <App />
        </DataProvider>
,    document.getElementById('root')
);
