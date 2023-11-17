import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import router from "./routes/index.jsx";
import './main.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
        ],
    },
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
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);
