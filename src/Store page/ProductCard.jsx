import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

const ProductCard = ({ imgURL, title, price, indexToShow, onClick }) => {
  return (
    <button
      className={styles["container"]}
      onClick={() => onClick(indexToShow)}
    >
      <div className={styles["product-image"]}>
        <img src={imgURL} alt="" />
      </div>
      <p className={styles["item-title"]}>{title}</p>
      <p className={styles["item-price"]}>${price}</p>
    </button>
  );
};

ProductCard.propTypes = {
  imgURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  indexToShow: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;
