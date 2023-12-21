import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

// Adiciona um interceptor antes de cada requisição
api.interceptors.request.use(
  (config) => {
    const storage = JSON.parse(localStorage.getItem("user-storage"));

    if (!storage) return config;

    const token = storage.state.user.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Pode tratar erros de requisição, se necessário
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para a resposta de cada requisição
api.interceptors.response.use(
  (response) => {
    // Pode fazer algo com a resposta antes de devolvê-la ao chamador
    return response;
  },
  (error) => {
    // Pode tratar erros de resposta, se necessário
    return Promise.reject(error);
  }
);

export default api;
