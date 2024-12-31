import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext} from './store/FireBaseContext'; // Make sure this import path is correct
import firebase from './firebase/config'; // Make sure this import path is correct

ReactDOM.render(
  <FirebaseContext.Provider value={{firebase}}>
    <App />
  </FirebaseContext.Provider>, // Properly close the Provider tag
  document.getElementById('root')
);
