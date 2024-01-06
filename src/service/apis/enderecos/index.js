import api from "../../api";

async function save(formData) {
  return await api.post(`/enderecos/usuario`, formData);
}

async function update(formData) {
  return await api.patch(`/enderecos/usuario`, formData);
}
export default { save, update };
