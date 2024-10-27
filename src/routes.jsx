import Home from "./Home";
import Layout from "./Layout";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
];

export default routes;
