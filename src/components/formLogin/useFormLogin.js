import { useState } from "react";
import AuthApi from "../../service/apis/autenticacao";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import userUserStore from "../../hooks/userUserStore";

const useFormLogin = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = userUserStore();

  const submit = async (formData) => {
    try {
      setIsLoading(true);

      const { data } = await AuthApi.realizaLogin(formData);
      setUser(data);

      navigate("/pet");
      enqueueSnackbar("Acesso realizado com sucesso.", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      if (error.response != null) {
        setIsLoading(false);
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, submit };
};

export default useFormLogin;
