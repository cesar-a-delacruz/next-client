export default function (type, data) {
  switch (type) {
    case "hidden":
      return {
        name: "businessId",
        type: "hidden",
        default: data,
      };
    case "select":
      return {
        name: "businessId",
        label: "Negocio",
        type: "select",
        options: data.map((business) => ({
          value: business.id,
          label: business.name,
        })),
        default: data[0].id,
      };
  }
}
