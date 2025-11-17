import Form from "@/components/Form";

const fields = [
  { name: "dateTime", label: "Date & Time", type: "datetime-local" },
  { name: "serviceId", label: "Service", type: "number" },
  { name: "clientId", label: "Client", type: "number" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "PENDING", label: "Pending" },
      { value: "CANCELLED", label: "Cancelled" },
      { value: "COMPLETED", label: "Completed" },
    ],
    default: "PENDING",
  },
  { name: "businessId", label: "Business", type: "number" },
];

export default function NewAppointment() {
  return (
    <Form
      title="New Appointment"
      fields={fields}
      endpoint="appointment"
      action="Create"
    />
  );
}
