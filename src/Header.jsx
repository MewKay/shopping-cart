import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = function createHeaderComponent({ itemNumber = 0 }) {
  return (
    <header>
      <h1>My Shop App</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"store"}>Store</Link>
        <a>Cart({itemNumber})</a>
      </nav>
    </header>
  );
};

Header.propTypes = {
  itemNumber: PropTypes.number,
};

export default Header;
