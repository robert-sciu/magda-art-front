import { useEffect, useState } from "react";
import styles from "./login.module.scss";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./loginSlice.js";
import { isAuthenticated } from "./loginSlice.js";

export default function Login() {
  const [email, setEmail] = useState("mail@example.pl");
  const [password, setPassword] = useState("admin123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuthenticated = useSelector(isAuthenticated);

  async function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  useEffect(() => {
    if (userAuthenticated) {
      navigate("/admin");
    }
  }, [userAuthenticated, navigate, dispatch]);

  return (
    <div className={styles.loginContainer}>
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
