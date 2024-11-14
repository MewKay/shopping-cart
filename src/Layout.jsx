import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import CartModal from "./CartModal";

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
  const orderSubtotal = cart
    .map((item) => item.quantity * item.productDetails.price)
    .reduce(
      (previousSubtotal, currentSubtotal) => previousSubtotal + currentSubtotal,
      defaultSubtotal
    );

  const handleShowCartModal = () => setShowCartModal(true);
  const handleHideCartModal = () => setShowCartModal(false);

  return (
    <>
      <Header
        totalQuantity={totalQuantity}
        handleShowCartModal={handleShowCartModal}
      />
      <Outlet context={{ cart, setCart, itemNumber, totalQuantity }} />
      {showCartModal && (
        <CartModal
          totalQuantity={totalQuantity}
          orderSubtotal={orderSubtotal}
          cart={cart}
          handleHideCartModal={handleHideCartModal}
        />
      )}
    </>
  );
};

export default Layout;
