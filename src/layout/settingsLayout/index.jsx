import {Link, Outlet, useNavigate} from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LogoSemNome from "../../assets/logo-sem-nome.png";
import Typography from "@mui/material/Typography";
import MenuProfile from "../../components/menuProfile/index.jsx";
import Drawer from "@mui/material/Drawer";
import {Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Inbox, Mail} from "@mui/icons-material";

const drawerWidth = 282;
export default function SettingsLayout() {
    const navigate = useNavigate();
    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} color="inherit">
                <Toolbar>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Link to={"/"} style={{
                            display: 'flex',
                            placeItems: 'center',
                            textDecoration: 'none',
                            color: 'black',
                            width: '167px',
                            height: '60px',
                            marginLeft: '33px',
                            marginBottom: '5px'
                        }}>
                            <img src={LogoSemNome} alt="logo" width={50} height={50}/>
                            <Typography variant="h6" sx={{flexGrow: 1}} component="div">
                                Animaverso
                            </Typography>
                        </Link>
                        <MenuProfile/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{flex: 1, flexGrow: 1, height: '100%'}}>
                    <Box sx={{overflow: 'auto'}}>
                        <List>
                            {['profile', 'interested', 'pets'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton onClick={() => navigate(`settings/${text}`)}>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <Inbox/> : <Mail/>}
                                        </ListItemIcon>
                                        <ListItemText primary={text}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
                <Box>
                    <Divider/>
                    <Box sx={{display: 'flex', placeItens: 'center', padding: 2, gap: 1, backgroundColor: 'white'}}>
                        <Button fullWidth variant={"contained"} color={"error"}>Sair</Button>
                    </Box>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}
