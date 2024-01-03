import { enqueueSnackbar } from "notistack";
import api from "../../api";
import userUserStore from "../../../hooks/userUserStore";

async function getNomeEmail(id) {
  if (id == null) {
    throw new Error("Codigo do usuario nao informado");
  }

  const { data } = await api.get(`/usuarios/${id}/nome-email`);
  return data;
}

async function alteraEmail(id, email) {
  const { user, setUser } = userUserStore.getState();

  if (id == null) {
    throw new Error("Codigo do usuario nao informado");
  }

  if (email == null) {
    throw new Error("Email nao informado");
  }

  try {
    const { data } = await api.patch(`/usuarios/${id}`, { email });
    user.usuario.email = data.email;
    setUser({ ...user });

    enqueueSnackbar("Usuário atualizado com sucesso.", {
      variant: "success",
      autoHideDuration: 3000,
    });
  } catch (error) {
    enqueueSnackbar(
      error?.response?.data?.message || "Erro ao atualizar o e-mail",
      { variant: "error", autoHideDuration: 3000 }
    );
  }
}
export default { getNomeEmail, alteraEmail };
