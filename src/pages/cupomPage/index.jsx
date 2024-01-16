import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CupomApi from "../../service/apis/cupom";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const CupomPage = () => {
  const { register, handleSubmit } = useForm();
  const [cupomPet, setCupom] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const cupom = await CupomApi.getCupom(data.cupom);
      setCupom(cupom);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message || "Erro ao validar cupom", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmaCupom = async () => {
    try {
      setLoading(true);
      const data = await CupomApi.confirmaCupom(cupomPet.codigo);
      enqueueSnackbar(data.message || "Cupom confirmado com sucesso", {
        variant: "success",
        autoHideDuration: 3000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message || "Erro ao validar cupom", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  function formatarCPF(cpf) {
    const numerosCpf = cpf.replace(/\D/g, "");

    return numerosCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (!isEmpty(cupomPet)) {
    return (
      <>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            width: "500px",
          }}
        >
          <Avatar
            alt="Foto do pet"
            src={cupomPet.image.data.publicUrl}
            sx={{ width: 64, height: 64 }}
          />
          <Box
            sx={{
              display: "grid",
              placeContent: "center",
            }}
          >
            <Typography fontWeight={"bold"}>Codigo do cupom</Typography>
            <Typography fontSize={"0.8rem"} textAlign={"center"}>
              {cupomPet.codigo}
            </Typography>
          </Box>
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "650px" }} aria-label="Dados da Adoção">
                <TableHead>
                  <TableRow>
                    <TableCell>Adotante</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>CPF</TableCell>
                    <TableCell>Nome do Pet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {cupomPet.pet.interessados[0].usuario.nome}
                    </TableCell>
                    <TableCell>
                      {cupomPet.pet.interessados[0].usuario.email}
                    </TableCell>
                    <TableCell>
                      {formatarCPF(cupomPet.pet.interessados[0].usuario.cpf)}
                    </TableCell>
                    <TableCell>{cupomPet.pet.nome}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button variant="contained" onClick={confirmaCupom}>
                Confirmar uso do cupom
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        component={"form"}
        width={350}
        onSubmit={handleSubmit(onSubmit)}
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
          Cupom
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "rgba(0, 0, 0, 0.80)",
          }}
        >
          Informe o código promocional para validar os descontos do nosso
          parceiro.
        </Typography>

        <TextField
          label="Cupom"
          variant="outlined"
          {...register("cupom", { required: true })}
        />

        <Button variant="contained" size="small" type="submit">
          Proximo
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default CupomPage;
