import Button from "@mui/material/Button";
import { bool, func, number } from "prop-types";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userUserStore from "../../../hooks/userUserStore";
import PetsApi from "../../../service/apis/pets";
import { enqueueSnackbar } from "notistack";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CadastrarEditarPet = ({ isOpen, handleClose, id }) => {
  const queryClient = useQueryClient();
  const { user } = userUserStore();

  console.log(id);
  const { register, handleSubmit, setValue } = useForm();

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const useMutationSavePet = useMutation({
    mutationFn: async (form) => {
      form["usuarioId"] = user.usuario.id;
      form.peso = Number(form.peso);
      return await PetsApi.save(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPets"] });
      handleClose();
      enqueueSnackbar("Pet cadastrado com sucesso!", { variant: "success" });
    },
  });

  const save = (data) => {
    useMutationSavePet.mutate(data);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Cadastro do Aumiguinho / Miauguinho
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        <Grid container>
          {/* Primeiro bloco: ocupa uma coluna e duas linhas */}
          <Grid item xs={12} md={5} lg={5}>
            <Box
              sx={{
                border: "1px dashed var(--primary)",
                borderRadius: "25px",
                width: "202px",
                height: "202px",
                display: "grid",
                placeItems: "center",
              }}
            >
              {!file ? (
                <Button
                  component="label"
                  variant="contained"
                  onChange={handleFileChange}
                  startIcon={<CloudUpload />}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt="File Preview"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "25px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
          </Grid>

          {/* Segundo bloco: ocupa a segunda coluna e duas linhas */}
          <Grid item xs={12} md={7} lg={7} rowSpacing={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  size="small"
                  {...register("nome")}
                />
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <TextField
                  fullWidth
                  label="Peso"
                  size="small"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                  {...register("peso")}
                />
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <FormControl fullWidth size="small">
                  <InputLabel id="labelEspecie">Especie</InputLabel>
                  <Select
                    labelId="labelEspecie"
                    defaultValue={"CACHORRO"}
                    id="especie"
                    label="Especie"
                    onChange={(event) => {
                      setValue("especie", event.target.value);
                    }}
                    {...register("especie")}
                  >
                    <MenuItem value={"CACHORRO"}>CACHORRO</MenuItem>
                    <MenuItem value={"GATO"}>GATO</MenuItem>
                    <MenuItem value={"OUTROS"}>OUTROS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="labelIdadel">Idade</InputLabel>
                  <Select
                    labelId="labelIdade"
                    id="idade"
                    label="Idade"
                    defaultValue={"ZERO_A_SEIS_MESES"}
                    onChange={() => {}}
                    {...register("idade")}
                  >
                    <MenuItem value={"ZERO_A_SEIS_MESES"}>
                      Zero a seis meses
                    </MenuItem>
                    <MenuItem value={"SEIS_MESES_A_UM_ANO"}>
                      Seis meses a um ano
                    </MenuItem>
                    <MenuItem value={"UM_A_DOIS_ANOS"}>Um a dois anos</MenuItem>
                    <MenuItem value={"DOIS_A_CINCO_ANOS"}>
                      Dois a cinco ou mais
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="labelPorte">Porte</InputLabel>
                  <Select
                    labelId="labelPorte"
                    id="porte"
                    defaultValue={"PEQUENO"}
                    label="Porte"
                    onChange={() => {}}
                    {...register("porte")}
                  >
                    <MenuItem value={"PEQUENO"}>Pequeno</MenuItem>
                    <MenuItem value={"MEDIO"}>Médio</MenuItem>
                    <MenuItem value={"GRANDE"}>Grande</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="labelGenero">Genero</InputLabel>
                  <Select
                    labelId="labelGenero"
                    id="genero"
                    label="Genero"
                    defaultValue={"MASCULINO"}
                    onChange={() => {}}
                    {...register("genero")}
                  >
                    <MenuItem value={"MASCULINO"}>Masculino</MenuItem>
                    <MenuItem value={"FEMININO"}>Feminino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Terceira linha: ocupa as duas colunas */}
          <Grid item xs={12} marginTop={2}>
            <TextField
              fullWidth
              id="obsPet"
              label="Observações"
              multiline
              rows={4}
              {...register("observacao")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          FECHAR
        </Button>
        <Button
          autoFocus
          variant="contained"
          type="submit"
          onClick={handleSubmit(save)}
        >
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CadastrarEditarPet.propTypes = {
  id: number.isRequired,
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};
export default CadastrarEditarPet;
