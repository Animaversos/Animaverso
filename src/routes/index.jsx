import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import Home from "../pages/home";
import LoginPage from "../pages/loginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
