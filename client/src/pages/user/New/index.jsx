import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomForm from "@/components/containers/CustomForm";
import { useState, useEffect } from "react";
import requestHandlers from "@/utils/requestHandlers.js";
import { jwtDecode } from "jwt-decode";

export default function New() {
  const [businesses, setBusinesses] = useState([]);

  const token = localStorage.getItem("jwtToken");
  if (token) {
    const userData = jwtDecode(token);
    if (userData.type === "CLIENT")
      return <Navigate to="/appointment/all" replace />;
    if (pageData.fields.length === 4) {
      const businessesField = {
        name: "businessId",
        type: "hidden",
        default: userData.businessId,
      };
      pageData.fields.push(businessesField);
    }
  } else {
    pageData.fields = pageData.fields.filter((field) => field.name !== "type");

    useEffect(() => {
      (async () => {
        const dataHandler = (json) => setBusinesses([...json]);
        await requestHandlers.findAll("business", [dataHandler]);
      })();
    }, []);

    if (pageData.fields.length === 3 && businesses.length) {
      const businessesField = {
        name: "businessId",
        label: "Negocio",
        type: "select",
      };
      businessesField.options = businesses.map((business) => ({
        value: business.id,
        label: business.name,
      }));
      businessesField.default = businesses[0].id;
      pageData.fields.push(businessesField);
    }
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
