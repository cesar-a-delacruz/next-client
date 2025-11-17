import Form from "@/components/Form";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "logo", label: "Logo URL", type: "text" },
  { name: "password", label: "Password", type: "password" },
];

export default function NewBusiness() {
  return (
    <Form
      title="New Business"
      fields={fields}
      endpoint="business"
      action="Create"
    />
  );
}
