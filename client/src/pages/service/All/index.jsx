import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CardGrid from "@/components/containers/CardGrid";

export default function All() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  document.title = "Next Client: Servicios";
  return (
    <CardGrid
      title="Servicios"
      fields={pageData.fields.filter((field) => field.name !== "image")}
      endpoint={pageData.endpoint}
    />
  );
}
