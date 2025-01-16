import Home from "./Home page/Home";
import Layout from "./App layout/Layout";
import Products from "./Store page/Products";
import Store from "./Store page/Store";
import Cart from "./Cart page/Cart";
import ErrorPage from "./ErrorPage";

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
    errorElement: <ErrorPage />,
  },
];

export default routes;
