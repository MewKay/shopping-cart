import { Link, useOutletContext } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";

const CartList = () => {
  const { itemNumber, cart } = useOutletContext();
  const itemPlural = itemNumber > 1 && "s";

  return (
    <div className={styles["cart-container"]}>
      <header className={styles["cart-header"]}>
        <h2>Your Shopping Cart</h2>
        <p>
          {itemNumber} different item{itemPlural}
        </p>
      </header>
      <div className={styles["cart-list"]}>
        <p className={styles["cart-list-header"]}>PRODUCT DETAILS</p>
        <p className={styles["cart-list-header"]}>QUANTITY</p>
        <p className={styles["cart-list-header"]}>PRICE</p>
        <p className={styles["cart-list-header"]}>TOTAL</p>
        <p className={styles["cart-list-header"]}>REMOVE</p>
        {cart.map((item, index) => (
          <CartItem
            key={item.productDetails.id}
            cartItem={item}
            cartItemIndex={index}
          />
        ))}
      </div>
      <div className={styles["go-shop-link-container"]}>
        <Link to={"/store/all"} className={styles["go-shop-link"]}>
          <MoveLeft />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

CartList.propTypes = {};

export default CartList;
