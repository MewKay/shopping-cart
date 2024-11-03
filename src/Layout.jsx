import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

const Layout = () => {
  const [cart, setCart] = useState([]);
  const defaultTotalQuantity = 0;
  const itemNumber = cart.length;
  const totalQuantity = cart
    .map((item) => item.quantity)
    .reduce(
      (previousTotal, currentQuantity) => previousTotal + currentQuantity,
      defaultTotalQuantity
    );
  return (
    <>
      <Header totalQuantity={totalQuantity} />
      <Outlet context={{ cart, setCart, itemNumber, totalQuantity }} />
    </>
  );
};

export default Layout;
