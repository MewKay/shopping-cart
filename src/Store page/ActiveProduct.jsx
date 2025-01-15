import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CircleX, Minus, Plus, ShoppingCart } from "lucide-react";
import styles from "./ActiveProduct.module.css";

const ActiveProduct = ({ product, onRemoveActiveProduct }) => {
  const { cart, setCart } = useOutletContext();
  const [productQuantity, setProductQuantity] = useState(1);
  const { id, title, image, description, price } = product;

  const handleIncreaseQuantity = () =>
    !productQuantity
      ? setProductQuantity(1)
      : setProductQuantity((value) => Number.parseInt(value) + 1);

  const handleDecreaseQuantity = () =>
    productQuantity <= 1 || !productQuantity
      ? setProductQuantity(1)
      : setProductQuantity((value) => Number.parseInt(value) - 1);

  const handleTypeQuantity = (e) => {
    const typedValue = e.target.value;
    setProductQuantity(typedValue);
  };

  const handleAddItemToCart = () => {
    const newCart = structuredClone(cart);
    const indexItemToAdd = newCart.findIndex(
      (cartItem) => cartItem.productDetails.id === id
    );

    if (indexItemToAdd >= 0) {
      newCart[indexItemToAdd].quantity += productQuantity;
    } else {
      newCart.push({
        productDetails: product,
        quantity: Number.parseInt(productQuantity),
      });
    }

    setCart(newCart);
  };

  const handleCloseSelectedItem = () => {
    onRemoveActiveProduct();
    setProductQuantity(1);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <img src={image} alt="" className={styles["product-preview"]} />
      </div>
      <div className={styles["product-info"]}>
        <h3 className={styles["title"]}>{title}</h3>
        <p className={styles["description"]}>{description}</p>
        <p className={styles["price"]}>${price}</p>
        <div className={styles["quantity-container"]}>
          <button
            aria-label="Increase quantity"
            onClick={handleIncreaseQuantity}
            className={styles["add-button"]}
          >
            <Plus />
          </button>
          <input
            aria-label="Quantity value"
            type="number"
            min={1}
            max={999}
            value={productQuantity}
            onChange={handleTypeQuantity}
            className={styles["quantity-input"]}
          />
          <button
            aria-label="Decrease quantity"
            onClick={handleDecreaseQuantity}
            className={styles["subtract-button"]}
          >
            <Minus />
          </button>
        </div>
        <div className={styles["add-cart-container"]}>
          <button
            onClick={handleAddItemToCart}
            className={styles["add-cart-button"]}
          >
            Add to cart
            <ShoppingCart />
          </button>
        </div>
      </div>
      <button
        aria-label="Close selected product"
        onClick={handleCloseSelectedItem}
        className={styles["close-button"]}
      >
        <CircleX />
      </button>
    </div>
  );
};

ActiveProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onRemoveActiveProduct: PropTypes.func.isRequired,
};

export default ActiveProduct;
