import { useOutletContext } from "react-router-dom";
import styles from "./CartSummary.module.css";

const CartSummary = () => {
  const { orderSubtotal } = useOutletContext();
  const deliveryFee = 0.0;
  const discount = 0.0;
  const orderTotal = orderSubtotal + deliveryFee + discount;

  return (
    <div className={styles["summary-container"]}>
      <h3 className={styles["summary-title"]}>Order Summary</h3>
      <div className={styles["summary-info"]}>
        <div>
          <p className={styles["summary-labels"]}>SUBTOTAL</p>
          <p className={styles["summary-prices"]}>${orderSubtotal}</p>
        </div>
        <div>
          <p className={styles["summary-labels"]}>DELIVERY</p>
          <p className={styles["summary-prices"]}>${deliveryFee}</p>
        </div>
        <div>
          <p className={styles["summary-labels"]}>DISCOUNT</p>
          <p className={styles["summary-prices"]}>${discount}</p>
        </div>
        <div className={styles["total-container"]}>
          <p className={styles["summary-labels"]}>TOTAL</p>
          <p className={styles["summary-prices"]}>${orderTotal}</p>
        </div>
        <button className={styles["checkout-button"]}>CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartSummary;
