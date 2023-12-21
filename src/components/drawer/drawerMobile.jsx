import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";

DrawerMobile.propTypes = {
  customProps: PropTypes.object,
};
export default function DrawerMobile({ customProps }) {
  return (
    <Drawer
      container={customProps.container}
      variant="temporary"
      open={customProps.mobileOpen}
      onClose={customProps.handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: customProps.drawerWidth,
        },
      }}
    >
      <Toolbar sx={{ marginBottom: 2 }} />
      {customProps.drawer}
    </Drawer>
  );
}
