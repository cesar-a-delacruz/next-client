import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function CustomPieChart({ data }) {
  const statuses = [
    { name: "completed", value: 0, color: "#00C49F" },
    { name: "pending", value: 0, color: "#FFBB28" },
    { name: "cancelled", value: 0, color: "#FF8042" },
  ];

  data.forEach((item) => {
    switch (item.status) {
      case "COMPLETED":
        statuses[0].value++;
        break;
      case "PENDING":
        statuses[1].value++;
        break;
      case "CANCELLED":
        statuses[2].value++;
        break;
    }
  });

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={statuses}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        dataKey="value"
        name="status"
      >
        {statuses.map((status, index) => (
          <Cell key={`cell-${index}`} fill={status.color} />
        ))}
      </Pie>
      <Legend />
      <Tooltip></Tooltip>
    </PieChart>
  );
}
