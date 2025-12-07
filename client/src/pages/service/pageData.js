import BasePageData from "@/utils/BasePageData";

export default new BasePageData(
  [
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "price", label: "Precio", type: "number" },
    { name: "image", label: "Imagen", type: "text" },
  ],
  "service",
);
