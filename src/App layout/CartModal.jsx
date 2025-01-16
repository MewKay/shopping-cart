import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CartModalItem from "./CartModalItem";
import { motion } from "motion/react";
import { X } from "lucide-react";
import styles from "./CartModal.module.css";

const CartModal = ({
  showCartModal,
  totalQuantity,
  orderSubtotal,
  cart,
  handleHideCartModal,
}) => {
  const itemPlural = totalQuantity > 1 ? "s" : "";
  const modalOpenStyle = showCartModal ? styles["open"] : "";

  return (
    <motion.div
      className={`
      ${styles["modal-overlay"]}
      ${modalOpenStyle}
      `}
      onClick={handleHideCartModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`
          ${styles["container"]}
          ${modalOpenStyle}
          `}
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <button
          className={styles["close-modal-button"]}
          aria-label={"Close cart preview"}
          onClick={handleHideCartModal}
        >
          <X />
        </button>
        <div className={styles["cart-quantity-info"]}>
          Your cart contains {totalQuantity} item{itemPlural}
        </div>
        <div className={styles["cart-content"]}>
          <div className={styles["subtotal-info"]}>
            <p>Order Subtotal</p>
            <p className={styles["subtotal"]}>${orderSubtotal}</p>
          </div>
          <Link
            className={styles["cart-link"]}
            to={"/store/cart"}
            onClick={handleHideCartModal}
          >
            View or Edit Your Cart
          </Link>
          <ul className={styles["item-list"]}>
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
      </motion.div>
    </motion.div>
  );
};

CartModal.propTypes = {
  showCartModal: PropTypes.bool.isRequired,
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
