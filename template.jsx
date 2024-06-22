// 1. Framework Imports
import React, { useState, useEffect } from "react";

// 2. Third-Party Libraries
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 3. Components
import TextEditor from "../../components/Admin/textEditor/TextEditor";
import PageImagesUpload from "../../components/Admin/pageImagesUpload/PageImagesUpload";

// 4. Redux Selectors and Thunks
import { loginUser, isAuthenticated, logout } from "../redux/slices/loginSlice";

// 5. Styles
import styles from "./admin.module.scss";

// 6. Custom Hooks (if any)
// import useCustomHook from '../../hooks/useCustomHook';

export default function Admin() {
  // State Hooks
  const [email, setEmail] = useState("mail@example.pl");
  const [password, setPassword] = useState("admin123");

  // Redux Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsAuthenticated = useSelector(isAuthenticated);

  // Effect Hooks
  useEffect(() => {
    if (!userIsAuthenticated) {
      navigate("/login");
    }
  }, [userIsAuthenticated, navigate]);

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // Return Statement
  return (
    <>
      {userIsAuthenticated ? (
        <div className={styles.adminContainer}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
          <TextEditor />
          <PageImagesUpload />
        </div>
      ) : null}
    </>
  );
}
