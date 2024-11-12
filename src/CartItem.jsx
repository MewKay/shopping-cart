import PropTypes from "prop-types";

const CartItem = ({ cartItem }) => {
  const {
    productDetails: { title, image, category, price },
    quantity,
  } = cartItem;
  const totalItemPrice = price * quantity;

  return (
    <li>
      <div>
        <div>
          <img src={image} alt="" />
          <div>
            <p>{title}</p>
            <p>Category: {category}</p>
          </div>
        </div>
        <div>
          <button>+</button>
          <input value={quantity} />
          <button>-</button>
        </div>
        <div>${price}</div>
        <div>${totalItemPrice}</div>
      </div>
      <button>X</button>
    </li>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    productDetails: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
    }),
    quantity: PropTypes.number,
  }),
};

export default CartItem;
