import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  Backdrop,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useCadastroUsuario from "./useCadastroUsuario";

const steps = ["Preencha os seus dados pessoais", "Crie seu usuário e senha"];

export default function CadastroUsuarioPage() {
  const { register, handleSubmit } = useForm();
  const [activeStep, setActiveStep] = React.useState(0);
  const { submit, isLoading } = useCadastroUsuario();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
        }}
      >
        <Box width={"500px"}>
          <Box
            component={"form"}
            onSubmit={handleSubmit(submit)}
            sx={{
              height: "300px",
            }}
          >
            <Box
              sx={{
                display: activeStep === 0 ? "flex" : "none",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                margin: "30px 0",
              }}
            >
              <Typography fontSize={"0.8rem"}>
                Preencha os campos a baixo, eles servirão para segurança de quem
                doa ou adota um amiguinho.
              </Typography>
              <TextField
                fullWidth
                label="Nome"
                size="small"
                {...register("nome", { required: true })}
              />
              <TextField
                fullWidth
                label="E-mail"
                size="small"
                type="email"
                {...register("email", { required: true })}
              />

              <TextField
                label="CPF"
                variant="outlined"
                fullWidth
                size="small"
                helperText="Informe apenas os numeros do seu CPF."
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 11,
                }}
                {...register("cpf")}
              />
            </Box>
            {activeStep == 1 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  margin: "30px 0",
                }}
              >
                <Typography fontSize={"0.8rem"}>
                  Preencha as informações de usuário, ela será usada para
                  acessar no sistema e você poderá contribuir com nosso
                  universo.
                </Typography>
                <TextField
                  fullWidth
                  label="Usuário"
                  size="small"
                  {...register("usuario", { required: true })}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  size="small"
                  {...register("senha", { required: true })}
                />
                <Button type="submit" variant="contained" fullWidth>
                  Cadastrar
                </Button>
              </Box>
            ) : (
              <></>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Proximo
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
}
