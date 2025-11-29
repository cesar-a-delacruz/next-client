import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function Chart({ type, date, parser }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('jwtToken');
      const result = await fetch(
        `http://localhost:3000/appointment/${type}/${date}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const json = await result.json();
      const parsedData = parser(json);
      setData(parsedData);
    })();
  }, []);

  if (data === null) return;
  switch (type) {
    case "piechart":
      const colors = {
        completed: "#00C49F",
        pending: "#FFBB28",
        cancelled: "#FF8042",
      };
      return (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            dataKey="value"
            name="appointments status"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.name]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip></Tooltip>
        </PieChart>
      );
    case "linechart":
      return (
        <LineChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
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
    case "numberchart":
      return (
        <>
          <div>
            {data.name}
            <p>{data.value} $</p>
          </div>
        </>
      );
    case "barchart":
      return (
        <BarChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            name="services"
            fill="#82ca9d"
            isAnimationActive={true}
          />
        </BarChart>
      );
  }
}
