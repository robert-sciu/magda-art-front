import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser, verifyToken } from "./loginSlice.js";
import { isAuthenticated } from "./loginSlice.js";

import styles from "./login.module.scss";

export default function Login() {
  const [email, setEmail] = useState("mail@example.pl");
  const [password, setPassword] = useState("admin123");
  const [checkedForToken, setCheckedForToken] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuthenticated = useSelector(isAuthenticated);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(verifyToken({ token }));
    }
    if (userAuthenticated) {
      navigate("/admin");
    } else {
      setTimeout(() => {
        setCheckedForToken(true);
      }, 200);
    }
  }, [userAuthenticated, navigate, dispatch, token]);

  function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  return (
    <div
      className={`${styles.loginContainer} ${checkedForToken && styles.show}`}
    >
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
