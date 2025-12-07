import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomForm from "@/components/containers/CustomForm";

export default function New() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  document.title = "Next Client: Nuevo Negocio";

  return (
    <CustomForm
      title="Nuevo Negocio"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
      action="Crear"
      submitActions={[]}
    />
  );
}
