import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import AllTable from "@/components/containers/AllTable";
import { jwtDecode } from "jwt-decode";

export default function All() {
  const token = localStorage.getItem("jwtToken");
  let userData;
  if (!token) return <Navigate to="/auth" replace />;
  else userData = jwtDecode(token);

  if (userData.type !== "EMPLOYEE") return <Navigate to="/auth" replace />;
  document.title = "Next Client: Usuarios";

  return (
    <AllTable
      title="Usuarios"
      fields={pageData.fields.filter(
        (field) => field.name !== "password" && field.name !== "businessId",
      )}
      endpoint={pageData.endpoint}
    />
  );
}
