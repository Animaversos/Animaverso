import TuneIcon from '@mui/icons-material/Tune';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import LogoSemNome from "../../assets/logo-sem-nome.png";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";


export default function CustomNavbar({ handleDrawerToggle }) {

  return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="inherit">
          <Toolbar>
              <Box sx={{display: 'flex', justifyContent: 'space-between',width: '100%'}}>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
              >
                  <TuneIcon />
              </IconButton>
              <Link to={"/"} style={{display: 'flex',placeItems: 'center', textDecoration: 'none', color: 'black'}}>
                  <img src={LogoSemNome} alt="logo" width={50} height={50}/>
                  <Typography variant="h6" sx={{flexGrow: 1}} component="div">
                      Animaverso
                  </Typography>
              </Link>
              <Button color="inherit">Login</Button>
              </Box>
          </Toolbar>
      </AppBar>
  );
}
CustomNavbar.propTypes = {
    handleDrawerToggle: PropTypes.func,
};