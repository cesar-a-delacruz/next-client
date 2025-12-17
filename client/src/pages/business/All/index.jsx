import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomTable from "@/components/containers/CustomTable";

export default function All() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  document.title = "Next Client: Negocios";

  return (
    <CustomTable
      title="Negocios"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
    />
  );
}
