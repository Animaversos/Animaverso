import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../service/apis/autenticacao";

const useRedefinirSenha = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (hash, formData) => {
    try {
      setIsLoading(true);

      if (formData.senha != formData.senhaConfirmada) {
        enqueueSnackbar("Senhas não coincidem", {
          variant: "error",
          autoHideDuration: 3000,
        });
        setIsLoading(false);
        return;
      }

      await AuthApi.redefinirSenha(hash, formData);
      navigate("/authentication/signin");
      enqueueSnackbar(
        "E-mail enviado com sucesso, verifique sua caixa de entrada.",
        {
          variant: "success",
          autoHideDuration: 3000,
        }
      );
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
export default useRedefinirSenha;
