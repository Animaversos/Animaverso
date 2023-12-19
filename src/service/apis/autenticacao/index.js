import api from "../../api";

const realizaLogin = async (body) => {
  if (body == null) {
    throw new Error("Corpo da requisição não informado");
  }

  return await api.post("/auth/login", body);
};

const relembraSenha = async (body) => {
  if (body == null) {
    throw new Error("Corpo da requisição não informado");
  }

  return await api.post("/auth/recuperar-senha", body);
};

const redefinirSenha = async (hash, body) => {
  if (body == null) {
    throw new Error("Corpo da requisição não informado");
  }

  return await api.post(`/auth/atualiza-senha-esquecida/${hash}`, body);
};

const cadastrarUsuario = async (body) => {
  if (body == null) {
    throw new Error("Corpo da requisição não informado");
  }

  return await api.post(`/auth/registrar`, body);
};

export default {
  realizaLogin,
  relembraSenha,
  redefinirSenha,
  cadastrarUsuario,
};
