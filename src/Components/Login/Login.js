import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // Loading state
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous error
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/')
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Stop loading
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter your password"
            required
          />
          <br />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
