import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import Home from "../pages/home";
import PetView from "../pages/petView/index.jsx";
import SettingsLayout from "../layout/settingsLayout/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children : [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/pet/:idPet",
            element: <PetView />
          },
        ]
      },
      {
        element: <SettingsLayout />,
        children: [
          {
            path: "settings/profile",
            element: <div>Profile</div>
          },
          {
            path: "settings/interested",
            element: <div>Interessados</div>
          },
          {
            path: "settings/pets",
            element: <div>pets</div>
          }
        ],
      },
    ],
  },
]);

export default router;
