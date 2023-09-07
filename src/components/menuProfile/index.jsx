import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar, Divider, Paper} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

export default function MenuProfile() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAndNavigate = (path) => {
        setAnchorEl(null);
        navigate(path, {replace: true})
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: '210px',
                    },
                }}
            >
                <MenuItem  onClick={() => handleCloseAndNavigate('settings/profile')}>
                    <Box>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Ismael Elias
                        </Typography>
                        <Typography sx={{color: 'rgba(0, 0, 0, 0.50)'}}>
                            ismael@gmail.com
                        </Typography>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleCloseAndNavigate('settings/profile')}>Perfil</MenuItem>
                <MenuItem onClick={() => handleCloseAndNavigate('settings/pets')}>Pets</MenuItem>
                <MenuItem onClick={() => handleCloseAndNavigate('settings/interested')}>Interesses</MenuItem>
                <Divider />
                <MenuItem onClick={() => handleCloseAndNavigate('settings/profile')}>
                    <Typography sx={{color: '#FF005C'}}>
                        Sair
                    </Typography>
                </MenuItem>


            </Menu>
        </div>
    );
}
