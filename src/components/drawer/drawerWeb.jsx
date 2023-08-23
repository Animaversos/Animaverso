import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";

DrawerWeb.propTypes = {
    customProps : PropTypes.object,
};
export default function DrawerWeb({customProps}) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                width: customProps.drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: customProps.drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            {customProps.drawer}
        </Drawer>
    );
}


