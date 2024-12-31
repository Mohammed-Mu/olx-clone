import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/FireBaseContext';
import './Signup.css';

export default function Signup() {
  const history = useHistory(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Access the Firebase instance from the context
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform Firebase signup
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return result.user
          .updateProfile({ displayName: username }) // Update the user profile with the username
          .then(() => {
            // Add user data to Firestore
            return firebase.firestore().collection('users').add({
              id: result.user.uid, // Use `uid` instead of `id` for Firebase user IDs
              username: username,
              phone: phone,
            });
          });
      })
      .then(() => {
        console.log('User signed up successfully');
        history.push('/login'); // Redirect to the login page after successful signup
      })
      .catch((error) => {
        console.error('Error during signup:', error);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder="Enter your username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
