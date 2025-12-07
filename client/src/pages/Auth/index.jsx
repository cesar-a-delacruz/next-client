import { Navigate } from "react-router-dom";
import pageData from "./pageData";
import CustomForm from "@/components/containers/CustomForm";

export default function Auth() {
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
      fields={pageData.fields}
      endpoint={pageData.endpoint}
      action="Entrar"
      submitActions={[setToken]}
    />
  );
}
