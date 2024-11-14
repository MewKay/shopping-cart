import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

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
    <div>
      <div>
        <img src={image} alt="" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>${price}</p>
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
      </div>
      <div>
        <button onClick={handleAddItemToCart}>Add to cart</button>
      </div>
      <button
        aria-label="Close selected product"
        onClick={handleCloseSelectedItem}
      >
        x
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
