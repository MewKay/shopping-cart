import Home from "./Home";
import Layout from "./Layout";
import Store from "./Store";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "store", element: <Store /> },
    ],
  },
];

export default routes;
