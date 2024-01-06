import api from "../../api";

async function getAllPetsByIdUsuario(id) {
  let { data } = await api.get(`/pets/usuario/${id}`);
  return data;
}

async function save(formData) {
  let { data } = await api.post(`/pets/`, formData);
  return data;
}

export default { getAllPetsByIdUsuario, save };
