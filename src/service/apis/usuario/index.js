import api from "../../api";

async function getUserById(id) {
  if (id == null) {
    throw new Error("Codigo do usuario nao informado");
  }

  const { data } = await api.get(`/usuarios/${id}`);
  console.log("data: ", data);
  return data;
}

export default { getUserById };
