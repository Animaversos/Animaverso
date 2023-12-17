import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoSemNome from "../../assets/logo-sem-nome.png";
import DogLp from "../../assets/dog-lp.png"
import PetsLp from "../../assets/pets-lp.png"
import Footer from "../../components/footer";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
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
            <Button variant="outlined" onClick={() => {
              navigate('/authentication/signin')
            }}>Entrar</Button>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '100px',
            width: '100%'
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box width={'50%'} sx={{
              paddingLeft: '5%'
            }}>
              <Typography fontSize={'2.5rem'}>
                Uma <b style={{ color: 'var(--primary)' }}>plataforma</b> para você descobrir o universo do <b style={{ color: 'var(--primary)' }}>amor</b>.
              </Typography>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '42px',
                mt: '30px'
              }}>
                <Button variant="contained">
                  Adote um amiguinho
                </Button>
                <p style={{ margin: '0px 20px' }}>OU</p>
                <Button variant="outlined">
                  Cadastre um pet
                </Button>
              </Box>
            </Box>
            <Box width={'50%'} sx={{
              display: 'grid',
              placeItems: 'center'
            }}>
              <img src={DogLp} alt="cachorro com fundo rosa" draggable="false"/>
            </Box>
          </Box>
          <Box sx={{
            mt: '10rem',
            display: 'grid',
            placeItems: 'center'
          }}>
            <Typography fontSize={'2.0rem'} marginBottom={'20px'}>
              Veja nosso <b style={{ color: 'var(--primary)' }}>universo</b>
            </Typography>
            <img src={PetsLp} alt="logo" draggable="false"/>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
