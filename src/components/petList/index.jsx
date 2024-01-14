import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import usePetStore from "../../hooks/usePetStore";
import { Favorite, Female, LocationOn, Male, Pets } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import InteressadosApi from "../../service/apis/interessados";
const parseEspecie = (params) => {
  const especie = params;
  const LabelsEspecies = {
    CACHORRO: "Cachorro",
    GATO: "Gato",
    OUTROS: "Outros",
  };
  return LabelsEspecies[especie] || "Não informado";
};

const PetList = () => {
  const { petsFiltrados, isLoading, addPageNumber, noMorePages } =
    usePetStore();

  const { mutate: interessePet } = useMutation({
    mutationFn: async (idPet) => {
      return await InteressadosApi.interesse(idPet);
    },
    onSuccess: (data) => {
      if (!data) return;

      enqueueSnackbar("Interesse cadastrado com sucesso!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    },
  });

  const marcaInteresse = (idPet) => {
    interessePet(idPet);
  };
  const pets = petsFiltrados.map((pet) => {
    return (
      <Grid item key={pet.id} xs={2} sm={4} md={4}>
        <Card
          sx={{
            maxWidth: 345,
            maxHeight: 480,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            sx={{ height: 170, objectFit: "cover" }}
            component="img"
            image={pet.url_image.data.publicUrl}
            title="green iguana"
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ mr: 1 }} fontWeight={"bold"}>
                {pet.nome}
              </Typography>
              {pet.genero === "MASCULINO" ? (
                <Male sx={{ fontSize: "25px", color: "#9F9F9F" }} />
              ) : (
                <Female sx={{ fontSize: "25px", color: "#9F9F9F" }} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="p"
                fontSize={".8rem"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <LocationOn /> {pet.usuario.endereco.estado.uf},{" "}
                {pet.usuario.endereco.cidades.nome}
              </Typography>
              <Typography
                variant="p"
                fontSize={".8rem"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <Pets /> {parseEspecie(pet.especie)}
              </Typography>
            </Box>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              disabled
              id="obsPet"
              label="História do pet"
              defaultValue={pet.observacao || "Não foi informada"}
              multiline
              rows={4}
            />
          </CardContent>
          <CardActions sx={{ flex: "1", alignItems: "flex-end" }}>
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={() => {
                marcaInteresse(pet.id);
              }}
              endIcon={<Favorite />}
            >
              Quero adotar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          width={"100%"}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {pets.length > 0 ? (
            pets
          ) : (
            <Typography>Nenhum pet encontrado</Typography>
          )}
        </Grid>
      </Container>
      <Button
        variant="container"
        onClick={() => addPageNumber()}
        sx={{
          display: `${noMorePages ? "none" : "block"}`,
        }}
      >
        Carregar mais
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default PetList;
