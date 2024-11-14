import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ totalQuantity = 0, handleShowCartModal }) => {
  return (
    <header>
      <h1>My Shop App</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"store"}>Store</Link>
        <button onClick={handleShowCartModal}>Cart({totalQuantity})</button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  totalQuantity: PropTypes.number,
  handleShowCartModal: PropTypes.func.isRequired,
};

export default Header;
