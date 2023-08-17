import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import LoginPage from "../pages/loginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
