import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const CartItem = ({ cartItem, cartItemIndex }) => {
  const { cart, setCart } = useOutletContext();
  const {
    productDetails: { id, title, image, category, price },
    quantity,
  } = cartItem;

  const [productQuantity, setProductQuantity] = useState(quantity);

  const totalItemPrice = price * productQuantity;

  const handleIncreaseQuantity = () => {
    const newCart = structuredClone(cart);

    if (!productQuantity) {
      newCart[cartItemIndex].quantity = 1;
      setProductQuantity(1);
      setCart(newCart);
      return;
    }

    newCart[cartItemIndex].quantity += 1;
    setProductQuantity((value) => Number.parseInt(value) + 1);
    setCart(newCart);
  };

  const handleDecreaseQuantity = () => {
    const newCart = structuredClone(cart);

    if (productQuantity <= 1 || !productQuantity) {
      newCart[cartItemIndex].quantity = 1;
      setProductQuantity(1);
      setCart(newCart);
      return;
    }

    newCart[cartItemIndex].quantity -= 1;
    setProductQuantity((value) => Number.parseInt(value) - 1);
    setCart(newCart);
  };

  const handleTypeQuantity = (e) => {
    const typedValue = e.target.value;
    const convertedNumber = Number.parseInt(typedValue);
    const newQuantity =
      !isNaN(convertedNumber) && convertedNumber >= 1 ? convertedNumber : 0;

    const newCart = structuredClone(cart);
    newCart[cartItemIndex].quantity = newQuantity;

    setCart(newCart);
    setProductQuantity(typedValue);
  };

  const handleRemoveCartItem = () => {
    const newCart = cart.filter(
      (cartItem) => cartItem.productDetails.id !== id
    );
    setCart(newCart);
  };

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
          <button
            aria-label="Increase quantity"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
          <input
            aria-label="Quantity value"
            type="number"
            min={1}
            value={productQuantity}
            onChange={handleTypeQuantity}
          />
          <button
            aria-label="Decrease quantity"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
        </div>
        <div>${price}</div>
        <div>${totalItemPrice}</div>
      </div>
      <button aria-label="Remove item from cart" onClick={handleRemoveCartItem}>
        X
      </button>
    </li>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    productDetails: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      image: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
    }),
    quantity: PropTypes.number,
  }),
  cartItemIndex: PropTypes.number.isRequired,
};

export default CartItem;
