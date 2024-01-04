import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AutocompleteEstado from "../../components/autoCompleteEstado";
import { useForm } from "react-hook-form";
import AutocompleteCidade from "../../components/autoCompleteCidade";

export default function EnderecoPage() {
  const { register, handleSubmit, setValue, watch } = useForm();

  const estadoWatch = watch("estado");

  const saveAlteracao = (data) => {
    console.log(data);
  };
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
        <Box component={"form"} onSubmit={handleSubmit(saveAlteracao)}>
          <Grid container spacing={2} marginBottom={2}>
            {/* Primeira Linha: Estado e Cidade */}
            <Grid item xs={6}>
              {/*<TextField label="Estado" size="small" fullWidth />*/}
              <AutocompleteEstado
                register={register("estado")}
                registerCidade={register("cidade")}
                setValue={setValue}
              />
            </Grid>
            <Grid item xs={6}>
              <AutocompleteCidade
                register={register("cidade")}
                setValue={setValue}
                estado={estadoWatch}
              />
            </Grid>

            {/* Segunda Linha: Bairro, Logradouro, Numero */}
            <Grid item xs={4}>
              <TextField
                label="Bairro"
                size="small"
                fullWidth
                {...register("bairro")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Logradouro"
                size="small"
                fullWidth
                {...register("logradouro")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Número"
                size="small"
                fullWidth
                {...register("numero")}
              />
            </Grid>

            {/* Terceira Linha: Complemento */}
            <Grid item xs={12}>
              <TextField
                label="Complemento"
                size="small"
                fullWidth
                {...register("complemento")}
              />
            </Grid>
          </Grid>
          <Button
            variant={"contained"}
            sx={{ width: "180px", textTransform: "none" }}
            type="submit"
          >
            Salvar alterações
          </Button>
        </Box>
      </Box>
    </>
  );
}
