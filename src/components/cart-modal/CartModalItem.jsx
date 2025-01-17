import PropTypes from "prop-types";
import styles from "./CartModalItem.module.css";

const CartModalItem = ({ image, title, price, quantity }) => {
  return (
    <li className={styles["item-card"]}>
      <div className={styles["image-container"]}>
        <img src={image} alt="" className={styles["item-image"]} />
      </div>
      <div className={styles["item-info"]}>
        <p className={styles["title"]}>{title}</p>
        <p className={styles["item-price"]}>
          {quantity} x ${price}
        </p>
      </div>
    </li>
  );
};

CartModalItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartModalItem;
