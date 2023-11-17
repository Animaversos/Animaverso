import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LogoSemNome from "../../assets/logo-sem-nome.png";

export default function LandingPage() {
  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
        <Box sx={{ display: "flex", placeItems: "center", gap: 3 }}>
          <Link to={"/pet"} style={{ textDecoration: "none", color: "black" }}>
            Pets
          </Link>
          <Button variant="outlined">Entrar</Button>
        </Box>
      </Box>
    </Container>
  );
}
