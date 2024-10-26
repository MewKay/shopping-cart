import PropTypes from "prop-types";

const Header = function createHeaderComponent({ itemNumber = 0 }) {
  return (
    <header>
      <h1>My Shop App</h1>
      <nav>
        <a>Home</a>
        <a>Store</a>
        <a>Cart({itemNumber})</a>
      </nav>
    </header>
  );
};

Header.propTypes = {
  itemNumber: PropTypes.number,
};

export default Header;
