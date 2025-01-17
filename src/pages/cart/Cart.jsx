import { useOutletContext } from "react-router-dom";
import styles from "./Cart.module.css";
import CartList from "./cart-list/CartList";
import CartSummary from "./cart-summary/CartSummary";

const Cart = () => {
  const { cart } = useOutletContext();
  const isCartEmpty = cart.length <= 0;

  return (
    <main className={styles["main-container"]}>
      <div className={styles["container"]}>
        {isCartEmpty ? (
          <p className={styles["empty-message"]}>Your Cart is empty</p>
        ) : (
          <>
            <CartList />
            <CartSummary />
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
