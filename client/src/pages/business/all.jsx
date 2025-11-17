import Table from "@/components/Table";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "phone", label: "Phone" },
  { key: "logo", label: "Logo" },
  { key: "password", label: "Password" },
];

export default function AllBusinesses() {
  return <Table title="All Businesses" columns={columns} endpoint="business" />;
}
