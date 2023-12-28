import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AutocompleteEstado from "../../components/autoCompleteEstado";

export default function EnderecoPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          width: "75%",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={"bold"}>
            Endereço
          </Typography>
          <Typography variant="p">
            Aqui voce podera preencher suas informações de endereço que sera
            utilizada para a saber aonde o Pet está.
          </Typography>
        </Box>
        <Divider />
        <Box component={"form"}>
          <Grid container spacing={2} marginBottom={2}>
            {/* Primeira Linha: Estado e Cidade */}
            <Grid item xs={6}>
              {/*<TextField label="Estado" size="small" fullWidth />*/}
              <AutocompleteEstado />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Cidade" size="small" fullWidth />
            </Grid>

            {/* Segunda Linha: Bairro, Logradouro, Numero */}
            <Grid item xs={4}>
              <TextField label="Bairro" size="small" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Logradouro" size="small" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Número" size="small" fullWidth />
            </Grid>

            {/* Terceira Linha: Complemento */}
            <Grid item xs={12}>
              <TextField label="Complemento" size="small" fullWidth />
            </Grid>
          </Grid>
          <Button
            variant={"contained"}
            sx={{ width: "180px", textTransform: "none" }}
          >
            Salvar alterações
          </Button>
        </Box>
      </Box>
    </>
  );
}
