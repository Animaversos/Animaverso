import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useRelembraSenha from "./useRelembraSenha";

export default function RelembrarSenhaPage() {
  const { register, handleSubmit } = useForm();
  const { submit, isLoading } = useRelembraSenha();
  return (
    <>
      <Box
        component={"form"}
        width={350}
        onSubmit={handleSubmit(submit)}
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
          Relembrar senha
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "rgba(0, 0, 0, 0.80)",
          }}
        >
          Ao informar os dados necessários e envia-lo, você receberá em seu
          e-mail com os passos a passos de como redefinir sua senha.
        </Typography>

        <TextField
          label="E-mail"
          placeholder="Informe o e-mail da sua conta."
          size="small"
          type="email"
          {...register("email", { required: true })}
        />
        <Button variant="contained" size="small" type="submit">
          Enviar
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
