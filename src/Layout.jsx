import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = function createLayoutComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
