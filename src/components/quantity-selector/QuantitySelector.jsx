import PropTypes from "prop-types";
import { Minus, Plus } from "lucide-react";
import styles from "./QuantitySelector.module.css";

const QuantitySelector = ({
  productQuantity,
  onIncreaseQuantity,
  onTypeQuantity,
  onDecreaseQuantity,
}) => {
  return (
    <div className={styles["quantity-container"]}>
      <button
        aria-label="Increase quantity"
        onClick={onIncreaseQuantity}
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
        onChange={onTypeQuantity}
        className={styles["quantity-input"]}
      />
      <button
        aria-label="Decrease quantity"
        onClick={onDecreaseQuantity}
        className={styles["subtract-button"]}
      >
        <Minus />
      </button>
    </div>
  );
};

QuantitySelector.propTypes = {
  productQuantity: PropTypes.any.isRequired,
  onIncreaseQuantity: PropTypes.func.isRequired,
  onTypeQuantity: PropTypes.func.isRequired,
  onDecreaseQuantity: PropTypes.func.isRequired,
};

export default QuantitySelector;
