import PropTypes from "prop-types";
import { Link, useMatch } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ totalQuantity = 0, handleShowCartModal }) => {
  const isHome = useMatch("/");
  const isCart = useMatch("/store/cart");
  const isStore = useMatch("/store/*") && !isCart;
  const shownQuantity = totalQuantity > 99 ? "+99" : totalQuantity;

  return (
    <header className={styles["container"]}>
      <h1 className={styles["brandname"]}>My Shop App</h1>
      <nav className={styles["navigation"]}>
        <Link
          to={"/"}
          className={`
            ${styles["nav-item"]}
            ${isHome ? styles["selected"] : ""}
            `}
        >
          Home
        </Link>
        <Link
          to={"store"}
          className={`
            ${styles["nav-item"]}
            ${isStore ? styles["selected"] : ""}
            `}
        >
          Store
        </Link>
        <button
          className={`
            ${styles["nav-item"]}
            ${styles["cart-open-button"]}
            ${isCart ? styles["selected"] : ""}
            `}
          onClick={handleShowCartModal}
        >
          Cart({shownQuantity})
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  totalQuantity: PropTypes.number,
  handleShowCartModal: PropTypes.func.isRequired,
};

export default Header;
