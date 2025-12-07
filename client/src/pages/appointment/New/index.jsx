import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomForm from "@/components/containers/CustomForm";
import { jwtDecode } from "jwt-decode";

export default function New() {
  const token = localStorage.getItem("jwtToken");
  let userData;
  if (!token) return <Navigate to="/auth" replace />;
  else userData = jwtDecode(token);

  if (userData.type !== "CLIENT") return <Navigate to="/auth" replace />;
  return (
    <CustomForm
      title="Nueva Cita"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
      action="Agendar"
      submitActions={[]}
    />
  );
}
