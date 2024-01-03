import { Backdrop, CircularProgress, Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UsuarioApi from "../../service/apis/usuario";
import useUserStore from "../../hooks/userUserStore";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const { user } = useUserStore();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getNomeEmail"],
    queryFn: () => UsuarioApi.getNomeEmail(user.usuario.id),
  });

  const useMutationSaveEmail = useMutation({
    mutationFn: async (email) => {
      return await UsuarioApi.alteraEmail(user.usuario.id, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNomeEmail"] });
    },
  });

  const saveAlteracao = (data) => {
    useMutationSaveEmail.mutate(data.email);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          width: "75%",
        }}
        onSubmit={handleSubmit(saveAlteracao)}
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
            disabled
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
            disabled={useMutationSaveEmail.isPending}
            {...register("email")}
          />
          <Button
            variant={"contained"}
            sx={{ width: "180px", textTransform: "none" }}
            size="small"
            type="submit"
            disabled={useMutationSaveEmail.isPending}
          >
            Salvar alterações{" "}
          </Button>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={useMutationSaveEmail.isPending}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
}
