import Form from "@/components/Form";

const serviceFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "price", label: "Price", type: "number" },
  { name: "image", label: "Image URL", type: "text" },
  { name: "businessId", label: "Business", type: "number" },
];

export default function NewService() {
  return (
    <Form
      title="New Service"
      fields={serviceFields}
      endpoint="service"
      action="Create"
    />
  );
}
