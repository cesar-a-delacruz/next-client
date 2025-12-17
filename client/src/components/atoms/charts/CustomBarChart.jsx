import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import CustomTooltip from "@/components/atoms/charts/CustomToolTip";

export default function CustomBarChart({ data }) {
  const dateTimes = data.map((appointment) => {
    return { name: appointment.service.name, value: 1 };
  });
  const appointments = dateTimes.reduce((acc, { name, value }) => {
    acc[name] = (acc[name] || 0) + value;
    return acc;
  }, {});

  const days = Object.keys(appointments).map((day) => {
    return { name: day, value: appointments[day] };
  });

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={days}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={CustomTooltip} />
      <Legend />
      <Bar
        dataKey="value"
        name="Servicios"
        fill="#82ca9d"
        isAnimationActive={true}
      />
    </BarChart>
  );
}
