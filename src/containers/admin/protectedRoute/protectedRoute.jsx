import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectAuthAuthenticationStatus,
  selectAuthToken,
  selectTokenVerificationStatus,
  setTokenVerificationComplete,
  verifyStoredToken,
} from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  const userIsAuthenticated = useSelector(selectAuthAuthenticationStatus);
  const tokenVerificationComplete = useSelector(selectTokenVerificationStatus);
  const token = useSelector(selectAuthToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(verifyStoredToken({ token }));
    } else dispatch(setTokenVerificationComplete());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tokenVerificationComplete && !userIsAuthenticated) {
      navigate("/login");
    }
  }, [userIsAuthenticated, navigate, tokenVerificationComplete]);

  useEffect(() => {
    if (!userIsAuthenticated) return;
    setShowChildren(true);
  }, [userIsAuthenticated]);

  return showChildren ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
