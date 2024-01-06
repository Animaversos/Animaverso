import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import TabelaPets from "../../components/TabelaPets";

export default function PetsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
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
          >
            CADASTRAR
          </Button>
        </Box>
      </Box>
      <Divider />
      <TabelaPets />
    </Box>
  );
}
