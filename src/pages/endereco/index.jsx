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
import userUserStore from "../../hooks/userUserStore";
import { enqueueSnackbar } from "notistack";
import EnderecoApi from "../../service/apis/enderecos";
import api from "../../service/api";
import { useQuery } from "@tanstack/react-query";

export default function EnderecoPage() {
  const { user } = userUserStore();
  const { register, handleSubmit, setValue, watch } = useForm();
  const estadoWatch = watch("estado");

  const { data: usuarioEndereco } = useQuery({
    queryKey: ["getCidades", user.usuario?.id],
    queryFn: async () => {
      if (user.usuario?.id) {
        const { data } = await api.get(
          `http://localhost:3000/api/enderecos/usuario/${user.usuario?.id}`
        );

        return data;
      }
      return {};
    },
  });

  const saveAlteracao = async (data) => {
    const enderecoDto = {
      bairro: data.bairro,
      id_cidade: data.cidade?.id,
      id_estado: data.estado?.id,
      complemento: data.complemento,
      logradouro: data.logradouro,
      numero: data.numero,
      id_usuario: user.usuario?.id,
    };
    if (!enderecoDto.id_estado) {
      enqueueSnackbar("O Estado não foi informado.", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }
    if (!enderecoDto.id_cidade) {
      enqueueSnackbar("A Cidade não foi informada.", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }

    try {
      const response = await EnderecoApi.save(enderecoDto);

      if (response) {
        enqueueSnackbar("Endereço cadastrado com sucesso.", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
    setValue("numero", inputValue);
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
                defaultValue={usuarioEndereco?.bairro}
                label="Bairro"
                size="small"
                fullWidth
                {...register("bairro", { required: true })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={usuarioEndereco?.logradouro}
                label="Logradouro"
                size="small"
                fullWidth
                {...register("logradouro", { required: true })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={usuarioEndereco?.numero}
                label="Número"
                size="small"
                type="text"
                InputProps={{
                  inputProps: {
                    maxLength: 10, // Defina o limite de tamanho desejado
                  },
                }}
                onInput={handleInputChange}
                fullWidth
                {...register("numero", { required: true })}
              />
            </Grid>

            {/* Terceira Linha: Complemento */}
            <Grid item xs={12}>
              <TextField
                defaultValue={usuarioEndereco?.complemento}
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
