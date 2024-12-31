import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext} from './store/Context'; // Make sure this import path is correct'
import Context from './store/Context';
import firebase from './firebase/config'; // Make sure this import path is correct

ReactDOM.render(
  <FirebaseContext.Provider value={{firebase}}>
    <Context>
    <App />
    </Context>
  </FirebaseContext.Provider>, // Properly close the Provider tag
  document.getElementById('root')
);
