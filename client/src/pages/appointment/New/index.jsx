import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomForm from "@/components/containers/CustomForm";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import requestHandlers from "@/utils/requestHandlers.js";

export default function New() {
  const token = localStorage.getItem("jwtToken");
  let userData;
  if (!token) return <Navigate to="/auth" replace />;
  else userData = jwtDecode(token);

  if (userData.type !== "CLIENT") return <Navigate to="/auth" replace />;
  document.title = "Next Client: Nueva Cita";

  const [services, setServices] = useState([]);
  useEffect(() => {
    (async () => {
      const dataHandler = (json) => setServices([...json]);
      await requestHandlers.findAll("service", [dataHandler]);
    })();
  }, []);

  if (pageData.fields.length === 1 && services.length) {
    const servicesField = {
      name: "serviceId",
      label: "Servicio",
      type: "select",
    };
    servicesField.options = services.map((service) => ({
      value: service.id,
      label: service.name,
    }));
    servicesField.default = services[0].id;
    pageData.fields.push(servicesField);
  }

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
