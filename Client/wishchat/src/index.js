// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main application component
import firebaseApp from './firebaseConfig'; 

// Initialize Firebase with your configuration

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
