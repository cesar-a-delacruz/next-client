import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import CustomForm from "@/components/containers/CustomForm";

export default {
  pageData: new BasePageData(
    [
      { name: "phone", label: "Teléfono", type: "number" },
      { name: "password", label: "Contraseña", type: "password" },
    ],
    "auth",
  ),
  Login() {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      return <Navigate to="/appointment/all" replace />;
    }

    document.title = "Next Client: Iniciar Sesión";
    const setToken = (json) => {
      if (json.token) localStorage.setItem("jwtToken", json.token);
      location.replace("/appointment/all");
    };

    return (
      <CustomForm
        title="Iniciar Sesión"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Entrar"
        submitActions={[setToken]}
      />
    );
  },
};
