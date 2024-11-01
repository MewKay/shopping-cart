import PropTypes from "prop-types";
import { useState } from "react";

const ActiveProduct = ({ product, onAddToCart, onRemoveActiveProduct }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const { id, title, image, description, price } = product;

  const handleIncreaseQuantity = () => setProductQuantity((value) => value + 1);
  const handleDecreaseQuantity = () => setProductQuantity((value) => value - 1);

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
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
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
        <button onClick={onAddToCart}>Add to cart</button>
      </div>
      <button
        aria-label="Close selected product"
        onClick={onRemoveActiveProduct}
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
  onAddToCart: PropTypes.func.isRequired,
  onRemoveActiveProduct: PropTypes.func.isRequired,
};

export default ActiveProduct;
