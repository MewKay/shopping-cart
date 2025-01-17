import Home from "./pages/home/Home";
import Layout from "./layout/Layout";
import Products from "./pages/store/products-list/Products";
import Store from "./pages/store/Store";
import Cart from "./pages/cart/Cart";
import ErrorPage from "./pages/error/ErrorPage";

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
