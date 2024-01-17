import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LogoSemNome from "../../assets/logo-sem-nome.png";
import Typography from "@mui/material/Typography";
import MenuProfile from "../../components/menuProfile/index.jsx";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Favorite, Person, Pets, Place } from "@mui/icons-material";
import useUserStorage from "../../hooks/userUserStore";
import { isEmpty } from "lodash";
const drawerWidth = 282;

const itensNavbar = [
  {
    id: 0,
    path: "settings/profile",
    text: "Perfil",
    icon: <Person />,
  },
  {
    id: 1,
    path: "settings/address",
    text: "Endereço",
    icon: <Place />,
  },
  {
    id: 2,
    path: "settings/pets",
    text: "Pets",
    icon: <Pets />,
  },
  {
    id: 3,
    path: "settings/interested",
    text: "Meus Interesses",
    icon: <Favorite />,
  },
];
export default function SettingsLayout() {
  const { user, delUser } = useUserStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useLayoutEffect(() => {
    itensNavbar.forEach((item) => {
      if (location.pathname.includes(item.path)) {
        setSelectedIndex(item.id);
      }
    });
  }, [location.pathname, user, navigate]);

  React.useEffect(() => {
    if (isEmpty(user)) {
      navigate("/authentication/signin");
      return;
    }
  }, [user, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="inherit"
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
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
                marginLeft: "33px",
                marginBottom: "5px",
              }}
            >
              <img src={LogoSemNome} alt="logo" width={50} height={50} />
              <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
                Animaverso
              </Typography>
            </Link>
            <Box sx={{ display: "flex", placeItems: "center", gap: 4 }}>
              <Link
                to={"/pet"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Encontrar pets
              </Link>
              <Link
                to={"/authentication/cupom"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Cupom
              </Link>
              <MenuProfile />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ flex: 1, flexGrow: 1, height: "100%" }}>
          <Box sx={{ overflow: "auto" }}>
            <List>
              {itensNavbar.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    selected={selectedIndex === item.id}
                    onClick={() => navigate(`${item.path}`)}
                    sx={{
                      "&.Mui-selected": {
                        ".MuiListItemText-primary": {
                          color: "var(--primary)",
                        },
                        ".MuiListItemIcon-root": {
                          color: "var(--primary)",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              placeItens: "center",
              padding: 2,
              gap: 1,
              backgroundColor: "white",
            }}
          >
            <Button
              fullWidth
              variant={"contained"}
              color={"error"}
              onClick={() => {
                delUser();
                navigate("/pet");
              }}
            >
              Sair
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
