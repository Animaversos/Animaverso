import TuneIcon from '@mui/icons-material/Tune';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Button} from "@mui/material";
import PropTypes from "prop-types";



export default function CustomNavbar({ handleDrawerToggle }) {

  return (  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="inherit">
          <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
              >
                  <TuneIcon />
              </IconButton>
              <Typography variant="h6" sx={{flexGrow: 1}} component="div">
                  Animaverso
              </Typography>
              <Button color="inherit">Login</Button>
          </Toolbar>
      </AppBar>
  );
}
CustomNavbar.propTypes = {
    handleDrawerToggle: PropTypes.func,
};