import api from "../../api";

async function getUserById(id) {
  if (id == null) {
    throw new Error("Codigo do usuario nao informado");
  }

  const { data } = await api.get(`/usuarios/${id}`);
  return data;
}

export default { getUserById };
