import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import Home from "../pages/home";
import PetView from "../pages/petView/index.jsx";
import SettingsLayout from "../layout/settingsLayout/index.jsx";
import Profile from "../pages/profile/index.jsx";
import ProfilePage from "../pages/profile/index.jsx";
import InteressadosPage from "../pages/interessados/index.jsx";
import PetsPage from "../pages/pets/index.jsx";

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
            element: <ProfilePage />
          },
          {
            path: "settings/interested",
            element: <InteressadosPage />
          },
          {
            path: "settings/pets",
            element: <PetsPage />
          }
        ],
      },
    ],
  },
]);

export default router;
