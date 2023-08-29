import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import Home from "../pages/home";
import PetView from "../pages/petView/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pet/:idPet",
        element: <PetView />
      }
    ],
  },

]);

export default router;
