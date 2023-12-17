import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import SettingsLayout from "../layout/settingsLayout/index.jsx";
import Home from "../pages/home";
import InteressadosPage from "../pages/interessados/index.jsx";
import LandingPage from "../pages/landingPage/index.jsx";
import PetsPage from "../pages/pets/index.jsx";
import ProfilePage from "../pages/profile/index.jsx";
import LoginPage from "../pages/loginPage/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/authentication/signin",
        element: <LoginPage />,
      },
      {
        element: <RootLayout />,
        children: [
          {
            path: "/pet",
            element: <Home />,
          },
        ],
      },
      {
        element: <SettingsLayout />,
        children: [
          {
            path: "settings/profile",
            element: <ProfilePage />,
          },
          {
            path: "settings/interested",
            element: <InteressadosPage />,
          },
          {
            path: "settings/pets",
            element: <PetsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
