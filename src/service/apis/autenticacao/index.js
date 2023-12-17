import api from "../../api";

const realizaLogin = async (body) => {
  if (body == null) {
    throw new Error("Corpo da requisição não informado");
  }

  return await api.post("/auth/login", body);
};

export default { realizaLogin };
