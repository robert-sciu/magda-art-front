import styles from "./admin.module.scss";
import TextEditor from "../../components/Admin/textEditor/TextEditor";
import PageImagesUpload from "../../components/Admin/pageImagesUpload/PageImagesUpload";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, logout } from "./loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import {} from "./loginSlice";
export default function Admin() {
  const userIsAuthenticated = useSelector(isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  }

  useEffect(() => {
    if (!userIsAuthenticated) {
      navigate("/login");
    }
  }, [userIsAuthenticated, navigate]);

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
