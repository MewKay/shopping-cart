import Home from "./Home";
import Layout from "./Layout";
import Products from "./Products";
import Store from "./Store";

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
    ],
  },
];

export default routes;
