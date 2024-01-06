import Button from "@mui/material/Button";
import { bool, func, number } from "prop-types";
import {
  Backdrop,
  CircularProgress,
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
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PetsApi from "../../../service/apis/pets";
import { enqueueSnackbar } from "notistack";
import UploadImagemPet from "../../uploadImagemPet";
import { useEffect } from "react";
import SkeletonLoadingCadastroEditaoPet from "../../skeletons/modalCadastroPet";

const CadastrarEditarPet = ({ isOpen, handleClose, id }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, reset, control } = useForm();

  const { data, isFetching: isLoadingPet } = useQuery({
    queryKey: ["getPetByUser"],
    queryFn: async () => {
      if (id) {
        return await PetsApi.getPetByUsuario(id);
      }
    },
    enabled: Boolean(id),
  });

  const { mutate, isPending, isLoading } = useMutation({
    mutationFn: async (form) => {
      if (!form.image || form.image.length === 0) {
        enqueueSnackbar("Selecione uma imagem", {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }
      return await PetsApi.save(form);
    },
    onSuccess: (data) => {
      if (!data) return;
      reset({ nome: "", peso: 0, observacao: "" });
      queryClient.invalidateQueries({ queryKey: ["getAllPets"] });
      handleClose();
      enqueueSnackbar("Pet cadastrado com sucesso!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
  });
  useEffect(() => {
    if (data) {
      setValue("nome", data.nome || "");
      setValue("peso", data.peso || 0);
      setValue("especie", data.especie || "CACHORRO");
      setValue("idade", data.idade || "ZERO_A_SEIS_MESES");
      setValue("porte", data.porte || "PEQUENO");
      setValue("genero", data.genero || "MASCULINO");
      setValue("observacao", data.observacao || "");
    }
  }, [data, setValue, isLoadingPet]);

  const save = (data) => {
    mutate(data);
  };

  return (
    <>
      <Dialog
        onClose={() => {
          reset({ nome: "", peso: 0, observacao: "" });
          handleClose();
        }}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {id ? "Editando" : "Cadastrando"} um Aumiguinho / Miauguinho
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            reset({ nome: "", peso: 0, observacao: "" });
            handleClose();
          }}
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
          {isLoadingPet ? (
            <SkeletonLoadingCadastroEditaoPet />
          ) : (
            <Grid container>
              <Grid item xs={12} md={5} lg={5}>
                <UploadImagemPet register={register} />
              </Grid>

              <Grid item xs={12} md={7} lg={7} rowSpacing={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      defaultValue={data.nome}
                      label="Nome"
                      size="small"
                      {...register("nome", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Controller
                      name="peso"
                      defaultValue={data?.peso || 0}
                      control={control}
                      rules={{ required: true, minLength: 0 }}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Peso"
                          size="small"
                          type="number"
                          InputProps={{
                            inputProps: {
                              min: 0, // Valor mínimo
                              max: 10000, // Valor máximo
                            },
                            startAdornment: (
                              <InputAdornment position="start">
                                kg
                              </InputAdornment>
                            ),
                          }}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="labelEspecie">Especie</InputLabel>
                      <Select
                        labelId="labelEspecie"
                        defaultValue={data?.especie || "CACHORRO"}
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
                        defaultValue={data?.idade || "ZERO_A_SEIS_MESES"}
                        onChange={() => {}}
                        {...register("idade")}
                      >
                        <MenuItem value={"ZERO_A_SEIS_MESES"}>
                          Zero a seis meses
                        </MenuItem>
                        <MenuItem value={"SEIS_MESES_A_UM_ANO"}>
                          Seis meses a um ano
                        </MenuItem>
                        <MenuItem value={"UM_A_DOIS_ANOS"}>
                          Um a dois anos
                        </MenuItem>
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
                        defaultValue={data?.porte || "PEQUENO"}
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
          )}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            onClick={() => {
              reset({ nome: "", peso: 0, observacao: "" });
              handleClose();
            }}
          >
            FECHAR
          </Button>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            onClick={handleSubmit(save)}
          >
            {id ? "EDITAR" : "CADASTRAR"}
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
        open={isPending || isLoading || false}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

CadastrarEditarPet.propTypes = {
  id: number,
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};
export default CadastrarEditarPet;
