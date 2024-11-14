import { Link, useOutletContext } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const { orderSubtotal, itemNumber, cart } = useOutletContext();
  const itemPlural = itemNumber > 1 && "s";
  const deliveryFee = 0.0;
  const discount = 0.0;
  const orderTotal = orderSubtotal + deliveryFee + discount;

  return (
    <div>
      <div>
        <header>
          <h2>Your Shopping Cart</h2>
          <p>
            {itemNumber} item{itemPlural}
          </p>
        </header>
        <ul>
          <li>Product Details</li>
          <li>Quantity</li>
          <li>Price</li>
          <li>Total</li>
        </ul>
        <ul>
          {cart.map((item, index) => (
            <CartItem
              key={item.productDetails.id}
              cartItem={item}
              cartItemIndex={index}
            />
          ))}
        </ul>
        <Link to={"/store/all"}>{"<-- Continue Shopping"}</Link>
      </div>
      <div>
        <div>
          <h3>Order Summary</h3>
          <div>
            <p>Subtotal:</p>
            <p>${orderSubtotal}</p>
          </div>
          <div>
            <p>Delivery:</p>
            <p>${deliveryFee}</p>
          </div>
          <div>
            <p>Discount:</p>
            <p>${discount}</p>
          </div>
          <div>
            <p>Total:</p>
            <p>${orderTotal}</p>
          </div>
          <button>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
