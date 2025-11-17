import Table from "@/components/Table";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "dateTime",
    label: "DateTime",
    render: (val) => new Date(val).toLocaleString(),
  },
  { key: "serviceId", label: "Service" },
  { key: "clientId", label: "Client" },
  { key: "status", label: "Status" },
  {
    key: "createdAt",
    label: "Created At",
    render: (val) => new Date(val).toLocaleString(),
  },
  { key: "businessId", label: "Business" },
];

export default function AllAppointments() {
  return (
    <Table title="All Appointments" columns={columns} endpoint="appointment" />
  );
}
