import BasePageData from "@/utils/BasePageData";

export default new BasePageData(
  [
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "phone", label: "Teléfono", type: "text" },
    { name: "logo", label: "Logo", type: "text" },
    { name: "password", label: "Contraseña", type: "password" },
  ],
  "business",
);
