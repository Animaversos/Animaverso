import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import useFormLogin from "./useFormLogin";
import { useForm } from "react-hook-form";
import InputSenha from "../inputSenha";
import { Link, useNavigate } from "react-router-dom";

const FormLogin = () => {
  const { handleSubmit, register } = useForm();
  const { submit, isLoading } = useFormLogin();
  const navigate = useNavigate();
  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit(submit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "320px",
          gap: 2,
        }}
      >
        <Typography textAlign="center" variant="h6" margin={"30px 0px"}>
          Entrar
        </Typography>
        <TextField
          label={"Usuário"}
          size="small"
          {...register("usuario", { required: true })}
        />
        <InputSenha register={{ ...register("senha", { required: true }) }} />

        <Link
          style={{
            color: "black",
          }}
          to={"/authentication/rememberPassword"}
        >
          <Typography>Esqueceu senha ?</Typography>
        </Link>
        <Button variant="contained" type="submit">
          Entrar
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              borderTop: "1px solid black",
              margin: "0 10px",
            }}
          ></div>
          <Typography>Novo neste universo ?</Typography>
          <div
            style={{
              flex: 1,
              borderTop: "1px solid black",
              margin: "0 10px",
            }}
          ></div>
        </Box>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/authentication/signup");
          }}
        >
          Cadastre-se
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
};

export default FormLogin;
