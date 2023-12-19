import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../service/apis/autenticacao";
const useCadastroUsuario = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (formData) => {
    try {
      setIsLoading(true);

      await AuthApi.cadastrarUsuario(formData);

      enqueueSnackbar("Cadastro realizado com sucesso.", {
        variant: "success",
        autoHideDuration: 3000,
      });

      navigate("/authentication/signin");
    } catch (error) {
      if (error.response != null) {
        setIsLoading(false);
        const message = Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error.response.data.message;
        enqueueSnackbar(message, {
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

export default useCadastroUsuario;
