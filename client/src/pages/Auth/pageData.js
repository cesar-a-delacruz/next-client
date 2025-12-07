import BasePageData from "@/utils/BasePageData";

export default new BasePageData(
  [
    { name: "phone", label: "Teléfono", type: "number" },
    { name: "password", label: "Contraseña", type: "password" },
  ],
  "auth",
);
