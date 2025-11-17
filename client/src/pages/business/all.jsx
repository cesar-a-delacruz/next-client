import Table from "@/components/Table";

export default function AllBusinesses() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "phone", label: "Phone" },
    { key: "logo", label: "Logo" },
    { key: "password", label: "Password" },
  ];
  return <Table title="All Businesses" columns={columns} endpoint="business" />;
}
