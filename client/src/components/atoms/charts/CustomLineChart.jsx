import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
export default function CustomLineChart({ data }) {
  const dateTimes = data.map((appointment) => {
    let dateTime = new Date(appointment.dateTime.substring(0, 10));
    dateTime.setDate(dateTime.getDate() + 1);
    return { name: dateTime.toDateString(), value: 1 };
  });
  const appointments = dateTimes.reduce((acc, { name, value }) => {
    acc[name] = (acc[name] || 0) + value;
    return acc;
  }, {});

  const days = Object.keys(appointments).map((day) => {
    return { name: day, value: appointments[day] };
  });

  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={days}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      <Tooltip />
      <Line
        type="monotone"
        name="appointments"
        dataKey="value"
        stroke="#8884d8"
        isAnimationActive={true}
      />
    </LineChart>
  );
}
