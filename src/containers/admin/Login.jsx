import { useState } from "react";
import styles from "./login.module.scss";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("mail@example.pl");
  const [password, setPassword] = useState("admin123");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        "http://localhost:4000/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      setMessage("login successful");
      navigate("/admin");
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  }

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
      {message && <p>{message}</p>}
    </div>
  );
}
