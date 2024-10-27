import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

const router = createBrowserRouter(routes);

const App = function createApp() {
  return <RouterProvider router={router} />;
};

export default App;
