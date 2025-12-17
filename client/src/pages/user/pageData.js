import BasePageData from "@/utils/BasePageData";
import enumTranslator from "@/utils/enumTranslator";

export default new BasePageData(
  [
    { name: "name", label: "Nombre", type: "text" },
    { name: "phone", label: "Teléfono", type: "number" },
    { name: "password", label: "Contraseña", type: "password" },
    {
      name: "type",
      label: "Tipo de Cuenta",
      type: "select",
      options: [
        { value: "CLIENT", label: "Cliente" },
        { value: "EMPLOYEE", label: "Empleado" },
      ],
      default: "CLIENT",
      render: (val) => enumTranslator.userType(val),
    },
  ],
  "user",
);
