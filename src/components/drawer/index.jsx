import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import ContainerMain from "../containerMain/index.jsx";
import FiltersContent from "../filtersContent/index.jsx";
import CustomNavbar from "../navbar/index.jsx";
import DrawerMobile from "./drawerMobile.jsx";
import DrawerWeb from "./drawerWeb.jsx";

const drawerWidth = 282;

CustomDrawer.propTypes = {
  window: PropTypes.func,
};

export default function CustomDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawerData = FiltersContent();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CustomNavbar handleDrawerToggle={handleDrawerToggle} />
      <Box component="nav" aria-label="mailbox folders">
        <>
          <DrawerMobile
            customProps={{
              drawerWidth: drawerWidth,
              drawer: drawerData,
              handleDrawerToggle: handleDrawerToggle,
              mobileOpen: mobileOpen,
              container: container,
            }}
          />
          <DrawerWeb
            customProps={{
              drawerWidth: drawerWidth,
              drawer: drawerData,
            }}
          />
        </>
      </Box>
      <ContainerMain />
    </Box>
  );
}
