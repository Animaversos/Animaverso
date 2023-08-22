
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../navbar/index.jsx";
import DrawerWeb from "./drawerWeb.jsx";
import DrawerMobile from "./drawerMobile.jsx";
import ContainerMain from "../containerMain/index.jsx";

const drawerWidth = 240;

CustomDrawer.propTypes = {
    window: PropTypes.func,
};
export default function CustomDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <div>Filtros</div>;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CustomNavbar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        aria-label="mailbox folders"
      >
        <DrawerMobile customProps={
          {
              drawerWidth: drawerWidth,
              drawer: drawer,
              handleDrawerToggle: handleDrawerToggle,
              mobileOpen: mobileOpen,
              container: container
          }}
        />
        <DrawerWeb customProps={
          {
            drawerWidth: drawerWidth,
            drawer: drawer
          }}
        />
      </Box>
      <ContainerMain />
    </Box>
  );
}