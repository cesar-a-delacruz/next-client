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
  ],
  "appointment",
);
