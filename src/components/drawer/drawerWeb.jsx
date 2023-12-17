import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LogoSemNome from "../../assets/logo-sem-nome.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

DrawerWeb.propTypes = {
  customProps: PropTypes.object,
};
export default function DrawerWeb({ customProps }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        width: customProps.drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: customProps.drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "105px",
          paddingX: 2,
        }}
      >
        <Link
          to={"/"}
          style={{
            display: "flex",
            placeItems: "center",
            textDecoration: "none",
            color: "black",
            width: "167px",
            height: "60px",
          }}
        >
          <img src={LogoSemNome} alt="logo" width={50} height={50} />
          <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
            Animaverso
          </Typography>
        </Link>
      </Box>
      {customProps.drawer}
    </Drawer>
  );
}
