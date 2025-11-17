import Form from "@/components/Form";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "phone", label: "Phone", type: "number" },
  { name: "password", label: "Password", type: "password" },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "CLIENT", label: "Client" },
      { value: "EMPLOYEE", label: "Employee" },
    ],
    default: "CLIENT",
  },
  { name: "businessId", label: "Business", type: "number" },
];

export default function NewUser() {
  return (
    <Form title="New User" fields={fields} endpoint="user" action="Create" />
  );
}
