import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import CustomNavbar from "../navbar/index.jsx";
import DrawerWeb from "./drawerWeb.jsx";
import DrawerMobile from "./drawerMobile.jsx";
import ContainerMain from "../containerMain/index.jsx";
import FiltersContent from "../filtersContent/index.jsx";
import {useLocation} from "react-router-dom";

const drawerWidth = 282;

CustomDrawer.propTypes = {
    window: PropTypes.func,
};


export default function CustomDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const rotasSemDrawer = ['/pet'];
  const deveOcultarDrawer = rotasSemDrawer.some((rota) =>
        location.pathname.startsWith(rota)
    );
  const drawerData = FiltersContent();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CustomNavbar handleDrawerToggle={handleDrawerToggle}  isSemDrawer={deveOcultarDrawer} />
      <Box
        component="nav"
        aria-label="mailbox folders"
      >
          {!deveOcultarDrawer && (
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
          )}
      </Box>
      <ContainerMain />
    </Box>
  );
}