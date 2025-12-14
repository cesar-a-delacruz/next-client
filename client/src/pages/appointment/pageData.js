import BasePageData from "@/utils/BasePageData";

export default new BasePageData(
  [
    {
      name: "dateTime",
      label: "Fecha y Hora",
      type: "datetime-local",
      render: (val) => new Date(val).toLocaleString(),
      default: new Date(),
    },
    { name: "serviceId", label: "Servicio", type: "number" },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { value: "PENDING", label: "Pendiente" },
        { value: "CANCELLED", label: "Cancelada" },
        { value: "COMPLETED", label: "Completada" },
      ],
      default: "PENDING",
    },
  ],
  "appointment",
);
