import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputSenha from "../../components/inputSenha";
import useRedefinirSenha from "./useRedefinirSenha";

export default function RedefinirSenhaPage() {
  const { register, handleSubmit } = useForm();
  const { submit, isLoading } = useRedefinirSenha();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let { hash } = useParams();

  if (!hash) {
    enqueueSnackbar(
      "Token necessário para atualizar a senha não encontrado, favor solicitar uma nova alteração de senha.",
      {
        variant: "warning",
        autoHideDuration: 3000,
      }
    );
    navigate("/authentication/signin");
  }
  return (
    <>
      <Box
        component={"form"}
        width={350}
        onSubmit={handleSubmit((data) => submit(hash, data))}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          textAlign="center"
          fontWeight="bold"
          color="#0E223B"
          margin={"30px 0px"}
        >
          Redefinir a senha
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "rgba(0, 0, 0, 0.80)",
          }}
        >
          Informe a nova senha para realizar a alteração.
        </Typography>

        <InputSenha
          onChange={() => {}}
          register={{ ...register("senha", { required: true }) }}
        />
        <InputSenha
          label="Confirmar senha"
          register={{ ...register("senhaConfirmada", { required: true }) }}
        />

        <Button variant="contained" size="small" type="submit">
          Salvar
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
}
