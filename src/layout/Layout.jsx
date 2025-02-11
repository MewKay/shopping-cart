import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Header from "./header/Header";
import CartModal from "../components/cart-modal/CartModal";

const Layout = () => {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const defaultTotalQuantity = 0;
  const defaultSubtotal = 0.0;
  const itemNumber = cart.length;
  const totalQuantity = cart
    .map((item) => item.quantity)
    .reduce(
      (previousTotal, currentQuantity) => previousTotal + currentQuantity,
      defaultTotalQuantity
    );
  const nonFormattedOrderSubtotal = cart
    .map((item) => item.quantity * item.productDetails.price)
    .reduce(
      (previousSubtotal, currentSubtotal) => previousSubtotal + currentSubtotal,
      defaultSubtotal
    );

  //Will format the number to always have 2 decimal places
  const orderSubtotal = Number(
    Math.round(nonFormattedOrderSubtotal + "e2") + "e-2"
  );

  const handleShowCartModal = () => {
    document.body.style.overflow = "hidden";
    setShowCartModal(true);
  };

  const handleHideCartModal = () => {
    document.body.style.overflow = "";
    setShowCartModal(false);
  };

  return (
    <>
      <Header
        totalQuantity={totalQuantity}
        handleShowCartModal={handleShowCartModal}
      />
      <Outlet
        context={{ cart, setCart, itemNumber, totalQuantity, orderSubtotal }}
      />
      <AnimatePresence>
        {showCartModal && (
          <CartModal
            showCartModal={showCartModal}
            totalQuantity={totalQuantity}
            orderSubtotal={orderSubtotal}
            cart={cart}
            handleHideCartModal={handleHideCartModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;
