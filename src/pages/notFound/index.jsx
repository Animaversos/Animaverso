import { Box } from "@mui/material";
import AuthenticationLayout from "../../layout/authenticationLayout";

const NotFoundPage = () => {
  return (
    <AuthenticationLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>404 - Pagina não encontrada</h1>
        <p>Está pagina que você está acessando não existe.</p>
      </Box>
    </AuthenticationLayout>
  );
};

export default NotFoundPage;
