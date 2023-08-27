import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff5722', // Substitua pela cor desejada
        },
    },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>
);
