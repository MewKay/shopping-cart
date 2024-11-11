import { useOutletContext } from "react-router-dom";

const Cart = () => {
  const { itemNumber } = useOutletContext();

  return (
    <div>
      <div>
        <header>
          <h2>Your Shopping Cart</h2>
          <p>{itemNumber} items</p>
        </header>
        <ul>
          <li>Product Details</li>
          <li>Quantity</li>
          <li>Price</li>
          <li>Total</li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
