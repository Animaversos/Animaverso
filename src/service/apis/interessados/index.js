import userUserStore from "../../../hooks/userUserStore";
import api from "../../api";

async function findAll() {
  const { user } = userUserStore.getState();
  let { data } = await api.get(`/interessados/pets/${user.usuario?.id}`);
  return data;
}

async function findAllMeusInteresses() {
  const { user } = userUserStore.getState();
  let { data } = await api.get(`/interessados/usuario/${user.usuario?.id}`);
  return data;
}

async function save(form) {
  let formData = new FormData();
  const { user } = userUserStore.getState();

  const imageForm = form.image[0];
  form["usuarioId"] = user.usuario.id;
  form.peso = Number(form.peso);
  delete form.image;

  formData.append("file", imageForm);
  formData.append("petInfo", JSON.stringify(form));

  let { data } = await api.post(`/pets/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

async function remove(id) {
  return await api.delete(`/interessados/${id}`);
}

export default { save, findAll, remove, findAllMeusInteresses };
