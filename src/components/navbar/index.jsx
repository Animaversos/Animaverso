import TuneIcon from "@mui/icons-material/Tune";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LogoSemNome from "../../assets/logo-sem-nome.png";
import MenuProfile from "../menuProfile/index.jsx";

export default function CustomNavbar({ handleDrawerToggle, isSemDrawer }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { sm: `calc(100% - ${isSemDrawer ? "0px" : "282px"})` },
        ml: { sm: `282px` },
      }}
      color="inherit"
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "space-between",
              md: `${isSemDrawer ? "space-between" : "end"}`,
            },
            width: "100%",
            height: "65px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <TuneIcon />
          </IconButton>
          <Link
            to={"/"}
            style={{
              display: `${isSemDrawer ? "flex" : "none"}`,
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
          {/*<Button color="inherit">Login</Button>*/}
          <Box sx={{ display: "flex", placeItems: "center", gap: 4 }}>
            <Link
              to={"/pet"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Encontrar pets
            </Link>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Parceiros
            </Link>
            <MenuProfile />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
CustomNavbar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  isSemDrawer: PropTypes.bool,
};
