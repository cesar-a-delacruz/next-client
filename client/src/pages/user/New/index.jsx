import { Navigate } from "react-router-dom";
import pageData from "../pageData.js";
import CustomForm from "@/components/containers/CustomForm";
import { useState, useEffect } from "react";
import requestHandlers from "@/utils/requestHandlers.js";
import { jwtDecode } from "jwt-decode";
import businessFieldGenerator from "@/utils/businessFieldGenerator.js";

export default function New() {
  const [businesses, setBusinesses] = useState([]);

  const token = localStorage.getItem("jwtToken");
  let userData;

  if (token) {
    userData = jwtDecode(token);
    if (userData.type === "CLIENT")
      return <Navigate to="/appointment/all" replace />;
  }

  useEffect(() => {
    (async () => {
      const dataHandler = (json) => setBusinesses([...json]);
      await requestHandlers.findAll("business", [dataHandler]);
    })();
  }, []);

  if (userData && pageData.fields.length === 4) {
    if (userData.businessId === null && businesses.length) {
      pageData.fields[3].default = "EMPLOYEE";
      pageData.fields.push(businessFieldGenerator("select", businesses));
    } else if (userData.businessId !== null) {
      pageData.fields.push(
        businessFieldGenerator("hidden", userData.businessId),
      );
    }
  } else if (!userData) {
    pageData.fields = pageData.fields.filter((field) => field.name !== "type");
    if (pageData.fields.length === 3 && businesses.length) {
      pageData.fields.push(businessFieldGenerator("select", businesses));
    }
  }

  document.title = "Next Client: Nueva Cuenta";
  const redirect = () =>
    userData.businessId
      ? location.replace("/auth")
      : location.replace("/user/all");

  return (
    <CustomForm
      title="Nueva Cuenta"
      fields={pageData.fields}
      endpoint={pageData.endpoint}
      action="Registrar"
      submitActions={[redirect]}
    />
  );
}
