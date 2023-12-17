import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

const steps = ["Preencha os seus dados pessoais", "Crie seu usuário e senha"];

export default function CadastroUsuarioPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, control, formState } = useForm();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (!formState.isValid) {
      enqueueSnackbar("Preencha os campos corretamente.", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const insertMaskInCpf = (cpf) => {
    cpf.replace(/\D/g, "");

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
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
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
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

              <Controller
                name="cpf"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="CPF"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputProps={{ maxLength: 14 }}
                    placeholder="000.000.000-00"
                    value={insertMaskInCpf(field.value)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
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
    </Box>
  );
}
