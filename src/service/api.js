import axios from "axios";
import useUserStorage from "../hooks/userUserStore";
import { enqueueSnackbar } from "notistack";
const api = axios.create({
  baseURL: "https://api.animaverso.com.br/api",
  withCredentials: true, // se estiver usando credenciais (cookies, tokens, etc.)
  headers: {
    "Content-Type": "application/json",
    Origin: "https://animaverso.com.br", // substitua pelo URL de sua aplicação React
  },
});

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
    const { delUser } = useUserStorage.getState();
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
        delUser();
        enqueueSnackbar(refreshError.response.data.message, {
          variant: "error",

          autoHideDuration: 3000,
        });

        setInterval(() => {
          window.location.href = "/";
        }, 2000);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
