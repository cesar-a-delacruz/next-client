import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import AllTable from "@/components/containers/AllTable";

export default function All() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  document.title = "Next Client: Negocios";

  return (
    <AllTable
      title="Negocios"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
    />
  );
}
