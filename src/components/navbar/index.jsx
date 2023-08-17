import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function ResponsiveAppBar() {
  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography
              sx={{
                flexGrow: 1,
              }}
            >
              Animaverso
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="outlined"
                sx={{ borderColor: "orange", color: "orange" }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
