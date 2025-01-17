import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles["container"]}>
      <h1 className={styles["status-code"]}>404</h1>
      <p className={styles["message"]}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to={"/"} className={styles["home-link"]}>
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
