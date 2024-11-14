import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import CartModal from "./CartModal";

const Layout = () => {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const defaultTotalQuantity = 0;
  const itemNumber = cart.length;
  const totalQuantity = cart
    .map((item) => item.quantity)
    .reduce(
      (previousTotal, currentQuantity) => previousTotal + currentQuantity,
      defaultTotalQuantity
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
      {showCartModal && <CartModal handleHideCartModal={handleHideCartModal} />}
    </>
  );
};

export default Layout;
