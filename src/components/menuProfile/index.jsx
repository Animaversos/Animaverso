import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Divider } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useUserStorage from "../../hooks/userUserStore";

export default function MenuProfile() {
  const { user, delUser } = useUserStorage();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAndNavigate = (path) => {
    setAnchorEl(null);
    navigate(path, { replace: true });
  };

  if (!user || !user.usuario) {
    return (
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/authentication/signin");
        }}
      >
        Entrar
      </Button>
    );
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {user.usuario.usuario.substr(0, 1)}
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "210px",
          },
        }}
      >
        <MenuItem
          onClick={() => handleCloseAndNavigate("settings/profile")}
          sx={{
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {user.usuario.nome}
            </Typography>
            <Typography
              sx={{
                maxWidth: "190px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: ".9rem",
              }}
            >
              {user.usuario.email}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleCloseAndNavigate("settings/profile")}>
          Perfil
        </MenuItem>
        <MenuItem onClick={() => handleCloseAndNavigate("settings/address")}>
          Endereço
        </MenuItem>
        <MenuItem onClick={() => handleCloseAndNavigate("settings/pets")}>
          Pets
        </MenuItem>
        <MenuItem onClick={() => handleCloseAndNavigate("settings/interested")}>
          Meus Interesses
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            delUser();
            navigate("/pet");
          }}
        >
          <Typography sx={{ color: "#FF005C" }}>Sair</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
