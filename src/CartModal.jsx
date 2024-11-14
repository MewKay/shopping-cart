import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CartModalItem from "./CartModalItem";

const CartModal = ({
  totalQuantity,
  orderSubtotal,
  cart,
  handleHideCartModal,
}) => {
  const itemPlural = totalQuantity > 1 && "s";
  return (
    <div>
      <div>
        <button aria-label={"Close cart preview"} onClick={handleHideCartModal}>
          x
        </button>
        <div>
          Your cart contains {totalQuantity} item{itemPlural}
        </div>
        <div>
          <div>
            <p>Order Subtotal</p>
            <p>${orderSubtotal}</p>
          </div>
          <Link to={"/store/cart"}>View or Edit Your Cart</Link>
          <ul>
            {cart.map((item) => (
              <CartModalItem
                key={item.productDetails.id}
                image={item.productDetails.image}
                title={item.productDetails.title}
                price={item.productDetails.price}
                quantity={item.quantity}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  totalQuantity: PropTypes.number.isRequired,
  orderSubtotal: PropTypes.number.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      productDetails: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }),
      quantity: PropTypes.number.isRequired,
    })
  ),
  handleHideCartModal: PropTypes.func.isRequired,
};

export default CartModal;
