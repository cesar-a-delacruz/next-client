import Table from "@/components/Table";

export default function AllServices() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "image", label: "Image" },
    { key: "businessId", label: "Business" },
  ];
  return <Table title="All Services" columns={columns} endpoint="service" />;
}
