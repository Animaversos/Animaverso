import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/formLogin";
import userUserStore from "../../hooks/userUserStore";
import { useEffect } from "react";
import Utils from "../../utils";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = userUserStore();

  useEffect(() => {
    if (!Utils.isEmpty(user)) {
      navigate("/pet");
      return;
    }
  }, [user, navigate]);

  return <FormLogin />;
}
