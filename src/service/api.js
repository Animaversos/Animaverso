import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const getNewToken = async () => {
  const userStorage = localStorage.getItem("user-storage");
  const user = JSON.parse(userStorage);
  const response = await api.get(
    `auth/verifica-token/${user.state.user.refresh_token}`
  );

  user.state.user.access_token = response.data;
  localStorage.setItem("user-storage", JSON.stringify(user));
  return response.data;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Token expirado" &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        const newToken = await getNewToken();
        api.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/";
        localStorage.removeItem("user-storage");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
