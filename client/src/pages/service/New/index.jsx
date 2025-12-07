import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomForm from "@/components/containers/CustomForm";
import { jwtDecode } from "jwt-decode";

export default function New() {
  const token = localStorage.getItem("jwtToken");
  let userData;
  if (!token) return <Navigate to="/auth" replace />;
  else userData = jwtDecode(token);

  if (userData.type !== "EMPLOYEE") return <Navigate to="/auth" replace />;
  document.title = "Next Client: Nuevo Servicio";

  return (
    <CustomForm
      title="Nuevo Servicio"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
      action="Crear"
      submitActions={[]}
    />
  );
}
