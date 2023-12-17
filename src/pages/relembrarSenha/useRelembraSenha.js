import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../service/apis/autenticacao";

const useRelembrarSenha = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (formData) => {
    try {
      setIsLoading(true);

      const { data } = await AuthApi.relembraSenha(formData);
      console.log(data);
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
export default useRelembrarSenha;
