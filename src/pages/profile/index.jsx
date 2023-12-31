import { Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import UsuarioApi from "../../service/apis/usuario";
import useUserStore from "../../hooks/userUserStore";

export default function ProfilePage() {
  const { user } = useUserStore();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => UsuarioApi.getUserById(user.usuario.id),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        width: "75%",
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight={"bold"}>
          Perfil
        </Typography>
        <Typography variant="p">
          Aqui voce podera preencher suas informações para o nosso universo.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          label={"Nome"}
          fullWidth
          defaultValue={data.nome}
          helperText={
            "Este é o seu nome de exibição público. Pode ser seu nome real ou um pseudônimo."
          }
          size="small"
        />
        <TextField
          label={"E-mail"}
          fullWidth
          size="small"
          defaultValue={data.email}
        />
        <Button
          variant={"contained"}
          sx={{ width: "180px", textTransform: "none" }}
          size="small"
        >
          Salvar alterações
        </Button>
      </Box>
    </Box>
  );
}
