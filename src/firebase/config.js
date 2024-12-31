import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDP5SlLLPxS1QHb788fD3U9b3nYCugVd1k",
    authDomain: "olx-login-21331.firebaseapp.com",
    projectId: "olx-login-21331",
    storageBucket: "olx-login-21331.firebasestorage.app",
    messagingSenderId: "47311921371",
    appId: "1:47311921371:web:eb2d05ee12b7850f8d2cfe"
  };

  const Firebase = firebase.initializeApp(firebaseConfig);
  export default Firebase;
