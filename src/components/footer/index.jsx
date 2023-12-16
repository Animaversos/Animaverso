import { Box, Typography } from "@mui/material";


export default function Footer () {
    return (
        <Box sx={{
            height: '85px',
            backgroundColor: '#F6F6F6',
            display: 'flex',
            alignItems: 'center',
            mt: '2rem',
            paddingLeft: '2rem',
            borderTop: '1px solid #EEEEEE'
        }}>
            <Typography>Direitos reservados ao Animaverso.</Typography>
        </Box>
    );
}