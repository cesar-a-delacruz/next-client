import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function CustomPieChart({ data }) {
  const appointments = {
    completed: 0,
    pending: 0,
    cancelled: 0,
  };
  data.forEach((item) => {
    switch (item.status) {
      case "PENDING":
        appointments.pending++;
        break;
      case "COMPLETED":
        appointments.completed++;
        break;
      case "CANCELLED":
        appointments.cancelled++;
        break;
    }
  });

  let statuses = [];
  for (const status in appointments) {
    statuses.push({ name: status, value: appointments[status] });
  }

  const colors = {
    completed: "#00C49F",
    pending: "#FFBB28",
    cancelled: "#FF8042",
  };

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
        {statuses.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[entry.name]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip></Tooltip>
    </PieChart>
  );
}
