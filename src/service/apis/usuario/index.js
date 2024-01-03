import { enqueueSnackbar } from "notistack";
import api from "../../api";

async function getUserById(id) {
  if (id == null) {
    throw new Error("Codigo do usuario nao informado");
  }

  const { data } = await api.get(`/usuarios/${id}`);
  return data;
}

async function alteraEmail(id, email) {
  if (id == null) {
    throw new Error("Codigo do usuario nao informado");
  }

  if (email == null) {
    throw new Error("Email nao informado");
  }

  try {
    const { data } = await api.patch(`/usuarios/${id}`, { email });
    enqueueSnackbar(data.message, {
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
export default { getUserById, alteraEmail };
