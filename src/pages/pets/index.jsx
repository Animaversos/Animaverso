import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import TabelaPets from "../../components/TabelaPets";
import { useState } from "react";
import CadastrarEditarPet from "../../components/modals/cadastrarEditarPet";
import TabelaInteressados from "../../components/TabelaInteressados";

export default function PetsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ width: "98%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={"bold"}>
            Pets
          </Typography>
          <Typography variant="p">
            Aqui voce podera ver e cadastrar seus aumiguinhos e miauguinhos.
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={handleOpenModal}
          >
            CADASTRAR
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <TabelaPets />
      <CadastrarEditarPet isOpen={modalOpen} handleClose={handleCloseModal} />
      <Box mt={2} mb={2}>
        <Typography variant="h5" fontWeight={"bold"}>
          Pessoas interessadas
        </Typography>
        <Typography variant="p">
          Aqui voce podera ver as pessoas interessadas em seus aumiguinhos e
          miauguinhos.
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <TabelaInteressados />
    </Box>
  );
}
