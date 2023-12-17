import { Box, Button, Container, Typography } from "@mui/material";
import Footer from "../../components/footer";
import { Link, useNavigate } from "react-router-dom";
import LogoSemNome from "../../assets/logo-sem-nome.png";
import FormLogin from "../../components/formLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container fixed component="main" style={{ flexGrow: 1 }}>
        <Box
          component={"header"}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{ height: "40px" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Voltar
          </Button>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: "42%",
              padding: 1,
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
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormLogin />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
