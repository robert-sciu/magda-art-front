import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  selectAuthToken,
  selectAuthAuthenticationStatus,
  selectAuthLoadingStatus,
  selectTokenVerificationStatus,
  selectAuthErrorStatus,
  selectAuthErrorMessage,
  clearAuthError,
  verifyStoredToken,
  setTokenVerificationComplete,
} from "../../../store/authSlice";

import styles from "./login.module.scss";
import {
  isEmailValid,
  isPasswordValid,
} from "../../../utilities/regexUtilities";
import ModalWindowMain from "../../modalWindow/modalWindowMain";
import InputElement from "../../../components/elements/inputElement/inputElement";
import Button from "../../../components/elements/button/button";

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector(selectAuthAuthenticationStatus);
  const isLoading = useSelector(selectAuthLoadingStatus);
  const tokenVerificationComplete = useSelector(selectTokenVerificationStatus);
  const hasError = useSelector(selectAuthErrorStatus);
  const errorMessage = useSelector(selectAuthErrorMessage);

  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (token) {
      dispatch(verifyStoredToken({ token }));
    } else dispatch(setTokenVerificationComplete());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tokenVerificationComplete && token) return;
    if (loggedIn) {
      navigate("/admin");
    } else {
      setTimeout(() => {
        setShowLogin(true);
      }, 300);
    }
  }, [loggedIn, tokenVerificationComplete, token, navigate, dispatch]);

  function handleLogin(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      !isEmailValid(email) && setEmailError("Email is not valid");
      !isPasswordValid(password) &&
        setPasswordError("Password must be between 8 and 20 characters");
      return;
    }
    dispatch(loginUser({ email, password }));
  }

  return (
    <div className={`${styles.loginContainer}`}>
      {showLogin && (
        <form className={styles.formContainer}>
          <h3>Log in to admin panel</h3>
          <InputElement
            label={"Email"}
            type={"email"}
            name={"email"}
            inputError={emailError}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width={100}
            textAlign={"center"}
          />
          <InputElement
            label={"Password"}
            type={"password"}
            name={"password"}
            inputError={passwordError}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            width={100}
            textAlign={"center"}
          />
          <div className={styles.loginButtonContainer}>
            <Button
              label={"login"}
              onClick={handleLogin}
              isLoading={isLoading}
              loadingLabel={"logging in"}
              // fixedHeight={true}
            />
          </div>
        </form>
      )}
      {hasError && (
        <ModalWindowMain
          modalType={"error"}
          data={errorMessage}
          onCancel={clearAuthError}
        />
      )}
    </div>
  );
}
