import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import TabelaMeusInteressados from "../../components/TabelaMeusInteresses";

export default function InteressadosPage() {
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
            Meus interesses
          </Typography>
          <Typography variant="p">
            Aqui voce podera ver os pets que você teve interesse.
          </Typography>
        </Box>
      </Box>
      <Divider />
      <TabelaMeusInteressados />
    </Box>
  );
}
