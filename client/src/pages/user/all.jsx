import Table from "@/components/Table";

export default function AllUsers() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "password", label: "Password" },
    { key: "type", label: "Type" },
    { key: "businessId", label: "Business ID" },
  ];
  return <Table title="All Users" columns={columns} endpoint="user" />;
}
