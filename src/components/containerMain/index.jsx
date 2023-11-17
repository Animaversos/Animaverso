import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Outlet} from "react-router-dom";
import * as React from "react";
import PropTypes from "prop-types";

ContainerMain.propTypes = {
    drawerWidth: PropTypes.number,
};
export default function ContainerMain({ drawerWidth }) {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                height: '100vh',
            }}
        >
            <Toolbar />
            <Outlet />
        </Box>
    );
}