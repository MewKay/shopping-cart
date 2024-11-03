import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = function createHeaderComponent({ totalQuantity = 0 }) {
  return (
    <header>
      <h1>My Shop App</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"store"}>Store</Link>
        <button>Cart({totalQuantity})</button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  totalQuantity: PropTypes.number,
};

export default Header;
