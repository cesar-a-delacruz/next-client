import { useEffect, useState } from "react";
import CustomPieChart from "@/components/atoms/charts/CustomPieChart";
import CustomLineChart from "@/components/atoms/charts/CustomLineChart";
import CustomBarChart from "@/components/atoms/charts/CustomBarChart";
import NumberChart from "@/components/atoms/charts/NumberChart";
import "./index.css";

export default function Chart({ type, title }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("jwtToken");
      const result = await fetch(
        // `http://localhost:3000/appointment/${type}/${new Date()}`,
        `http://localhost:3000/appointment/${type}/${"2025-12-13"}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await result.json();
      setData(json);
      console.log(result);
    })();
  }, []);

  if (data === null) return;
  return (
    <div className={`chart ${type}`}>
      <h3>{title}</h3>
      {(() => {
        switch (type) {
          case "piechart":
            return <CustomPieChart data={data} />;
          case "linechart":
            return <CustomLineChart data={data} />;
          case "barchart":
            return <CustomBarChart data={data} />;
          case "numberchart":
            return <NumberChart data={data} />;
        }
      })()}
    </div>
  );
}
