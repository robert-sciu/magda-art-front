import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  verifyStoredToken,
  isAuthenticated,
  selectAuthToken,
  selectTokenVerificationComplete,
} from "../../../store/authSlice";

import styles from "./login.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedForToken, setCheckedForToken] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuthenticated = useSelector(isAuthenticated);
  const tokenVerificationComplete = useSelector(
    selectTokenVerificationComplete
  );

  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (token && !tokenVerificationComplete) {
      dispatch(verifyStoredToken({ token }));
    }
  }, [token, tokenVerificationComplete, dispatch]);

  useEffect(() => {
    if (userAuthenticated) {
      navigate("/admin");
    } else {
      setTimeout(() => {
        setCheckedForToken(true);
      }, 200);
    }
  }, [userAuthenticated, navigate, dispatch]);

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;
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
