import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomForm from "@/components/containers/CustomForm";

export default function New() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    return <Navigate to="/appointment/all" replace />;
  }
  document.title = "Next Client: Nueva Cuenta";

  return (
    <CustomForm
      title="Nueva Cuenta"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
      action="Registrar"
      submitActions={[]}
    />
  );
}
