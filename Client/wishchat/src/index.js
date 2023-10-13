import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// eslint-disable-next-line no-unused-vars
import firebaseApp from './firebaseConfig';
import { DataProvider } from './Components/DataManagement/DataContext';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>

        <DataProvider>
            <App />
        </DataProvider>
        </BrowserRouter>

,    document.getElementById('root')
);
