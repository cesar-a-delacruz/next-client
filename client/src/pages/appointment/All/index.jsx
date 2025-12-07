import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import Calendar from "@/components/containers/Calendar";

export default function All() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return <Navigate to="/auth" replace />;
  document.title = "Next Client: Citas";
  return (
    <Calendar
      title="Citas"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
    />
  );
}
