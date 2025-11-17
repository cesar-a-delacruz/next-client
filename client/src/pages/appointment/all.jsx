import Table from "@/components/Table";

export default function AllAppointments() {
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
  return (
    <Table title="All Appointments" columns={columns} endpoint="appointment" />
  );
}
