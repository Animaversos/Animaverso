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
import { useCallback, useEffect, useRef } from "react";
import SkeletonLoadingCadastroEditaoPet from "../../skeletons/modalCadastroPet";

const CadastrarEditarPet = ({ isOpen, handleClose, id }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, reset, control, watch } = useForm();
  const dataRef = useRef(null);
  let { data, isFetching: isLoadingPet } = useQuery({
    queryKey: ["getPetByUser"],
    queryFn: async () => {
      if (id) {
        dataRef.current = await PetsApi.getPetByUsuario(id);
        return dataRef.current;
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
      queryClient.invalidateQueries({ queryKey: ["getAllPets"] });
      enqueueSnackbar("Pet cadastrado com sucesso!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      resetAndClose();
    },
  });
  const {
    mutate: updatePet,
    isPending: isPendingUpdate,
    isLoading: isLoadingUpdate,
  } = useMutation({
    mutationFn: async (form) => {
      form["id"] = id;
      return await PetsApi.update(form);
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: ["getAllPets"] });
      enqueueSnackbar("Pet atualizado com sucesso!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      resetAndClose();
    },
  });

  const resetDados = useCallback(() => {
    reset({
      nome: "",
      peso: 0,
      observacao: "",
      especie: "CACHORRO",
      idade: "ZERO_A_SEIS_MESES",
      porte: "PEQUENO",
      genero: "MASCULINO",
      image: "",
    });
    setValue("especie", "CACHORRO");
    setValue("idade", "ZERO_A_SEIS_MESES");
    setValue("porte", "PEQUENO");
    setValue("genero", "MASCULINO");
    setValue("image", "");
  }, [reset, setValue]);

  useEffect(() => {
    if (isOpen) {
      if (id && data) {
        setValue("nome", data.nome || "");
        setValue("peso", data.peso || 0);
        setValue("especie", data.especie || "CACHORRO");
        setValue("idade", data.idade || "ZERO_A_SEIS_MESES");
        setValue("porte", data.porte || "PEQUENO");
        setValue("genero", data.genero || "MASCULINO");
        setValue("observacao", data.observacao || "");
      } else {
        dataRef.current = null;
        resetDados(); // Se não houver 'id' ou 'data', resetamos os dados
      }
    }
  }, [data, isOpen, setValue, resetDados, id]);

  const save = (data) => {
    mutate(data);
  };
  const update = (data) => {
    updatePet(data);
  };
  const resetAndClose = () => {
    resetDados();
    handleClose();
  };

  return (
    <>
      <Dialog
        onClose={resetAndClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {id ? "Editando" : "Cadastrando"} um Aumiguinho / Miauguinho
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={resetAndClose}
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
                <UploadImagemPet
                  register={register}
                  url_image={dataRef.current?.url_image}
                />
              </Grid>

              <Grid item xs={12} md={7} lg={7} rowSpacing={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      defaultValue={data?.nome}
                      label="Nome"
                      size="small"
                      {...register("nome", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Controller
                      name="peso"
                      defaultValue={dataRef.current?.peso || 0}
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
                        defaultValue={dataRef.current?.especie || "CACHORRO"}
                        id="especie"
                        label="Especie"
                        value={watch("especie")}
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
                        defaultValue={
                          dataRef.current?.idade || "ZERO_A_SEIS_MESES"
                        }
                        onChange={(event) => {
                          setValue("idade", event.target.value);
                        }}
                        value={watch("idade")}
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
                        defaultValue={dataRef.current?.porte || "PEQUENO"}
                        label="Porte"
                        onChange={(event) => {
                          setValue("porte", event.target.value);
                        }}
                        value={watch("porte")}
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
                        defaultValue={dataRef.current?.genero || "MASCULINO"}
                        onChange={(event) => {
                          setValue("genero", event.target.value);
                        }}
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
                  defaultValue={dataRef.current?.observacao || ""}
                  multiline
                  rows={4}
                  {...register("observacao")}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={resetAndClose}>
            FECHAR
          </Button>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            disabled={
              isPending ||
              isLoading ||
              isPendingUpdate ||
              isLoadingUpdate ||
              isLoadingPet ||
              false
            }
            onClick={id ? handleSubmit(update) : handleSubmit(save)}
          >
            {id ? "EDITAR" : "CADASTRAR"}
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
        open={
          isPending || isLoading || isPendingUpdate || isLoadingUpdate || false
        }
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
