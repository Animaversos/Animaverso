import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <div>teste</div>,
  },
]);

export default router;
