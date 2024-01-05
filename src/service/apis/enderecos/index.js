import api from "../../api";

async function save(formData) {
  return await api.post(`/enderecos/usuario`, formData);
}
export default { save };
