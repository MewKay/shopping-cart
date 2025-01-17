import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { X } from "lucide-react";
import styles from "./CartItem.module.css";
import QuantitySelector from "../../components/quantity-selector/QuantitySelector";

const CartItem = ({ cartItem, cartItemIndex }) => {
  const { cart, setCart } = useOutletContext();
  const {
    productDetails: { id, title, image, category, price },
    quantity,
  } = cartItem;

  const [productQuantity, setProductQuantity] = useState(quantity);

  //Will format the number to always have 2 decimal places
  const totalItemPrice = Number(
    Math.round(price * productQuantity + "e2") + "e-2"
  );

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
    <>
      <div className={styles["details-container"]}>
        <div className={styles["image-container"]}>
          <img src={image} alt="" className={styles["image-product"]} />
        </div>
        <div className={styles["details-info"]}>
          <p className={styles["details-title"]}>{title}</p>
          <p className={styles["details-category"]}>Category: {category}</p>
        </div>
      </div>
      <QuantitySelector
        productQuantity={productQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onTypeQuantity={handleTypeQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
      <div>${price}</div>
      <div>${totalItemPrice}</div>
      <button
        aria-label="Remove item from cart"
        onClick={handleRemoveCartItem}
        className={styles["remove-item"]}
      >
        <X />
      </button>
    </>
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
