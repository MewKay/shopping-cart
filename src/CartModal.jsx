import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartModal = ({ handleHideCartModal }) => {
  return (
    <div>
      <div>
        <button aria-label={"Close cart preview"} onClick={handleHideCartModal}>
          x
        </button>
        <div>Your cart contains 5 items</div>
        <div>
          <div>
            <p>Order Subtotal</p>
            <p>$659.00</p>
          </div>
          <Link to={"/store/cart"}>View or Edit Your Cart</Link>
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  handleHideCartModal: PropTypes.func.isRequired,
};

export default CartModal;
