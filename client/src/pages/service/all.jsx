import Table from "@/components/Table";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "price", label: "Price" },
  { key: "image", label: "Image" },
  { key: "businessId", label: "Business" },
];

export default function AllServices() {
  return <Table title="All Services" columns={columns} endpoint="service" />;
}
