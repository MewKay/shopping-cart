import { element } from "prop-types";
import Home from "./Home";
import Layout from "./Layout";
import Products from "./Products";
import Store from "./Store";
import Cart from "./Cart";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "store/:category",
        element: <Products />,
      },
      {
        path: "store/cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
