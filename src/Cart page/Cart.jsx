import { Link, useOutletContext } from "react-router-dom";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

const Cart = () => {
  const { orderSubtotal, itemNumber, cart } = useOutletContext();
  const isCartEmpty = cart.length <= 0;
  const itemPlural = itemNumber > 1 && "s";
  const deliveryFee = 0.0;
  const discount = 0.0;
  const orderTotal = orderSubtotal + deliveryFee + discount;

  return (
    <main className={styles["main-container"]}>
      <div className={styles["container"]}>
        {isCartEmpty ? (
          <p className={styles["empty-message"]}>Your Cart is empty</p>
        ) : (
          <>
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
                <p></p>
                {cart.map((item, index) => (
                  <CartItem
                    key={item.productDetails.id}
                    cartItem={item}
                    cartItemIndex={index}
                  />
                ))}
              </div>
              <Link to={"/store/all"} className={styles["go-shop-link"]}>
                {"<-- Continue Shopping"}
              </Link>
            </div>
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
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
