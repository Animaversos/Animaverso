import userUserStore from "../../../hooks/userUserStore";
import api from "../../api";

async function getAllPetsByIdUsuario(id) {
  let { data } = await api.get(`/pets/usuario/${id}`);
  return data;
}

async function getPetByUsuario(id) {
  const { user } = userUserStore.getState();
  let { data } = await api.get(`/pets/usuario/${user.usuario?.id}/${id}`);
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

async function update(form) {
  let formData = new FormData();
  console.log(form);
  const idPet = form.id;

  if (form.image || form.image.length >= 0) {
    const imageForm = form.image[0];
    formData.append("file", imageForm);
    delete form.file_original_name;
    delete form.url_image;
  }

  delete form.id;
  delete form.image;
  form.peso = Number(form.peso);
  formData.append("petInfo", JSON.stringify(form));

  let { data } = await api.post(`/pets/${idPet}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

async function remove(id) {
  return await api.delete(`/pets/${id}`);
}

async function adota(id) {
  return await api.patch(`/pets/adotou/${id}`);
}

async function search(filters) {
  return await api.get(`/pets?${filters}`);
}

export default {
  getAllPetsByIdUsuario,
  save,
  getPetByUsuario,
  update,
  remove,
  adota,
  search,
};
