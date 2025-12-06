import { useEffect, useState } from "react";
import CustomPieChart from "@/components/atoms/charts/CustomPieChart";
import CustomLineChart from "@/components/atoms/charts/CustomLineChart";
import CustomBarChart from "@/components/atoms/charts/CustomBarChart";
import NumberChart from "@/components/atoms/charts/NumberChart";

export default function Chart({ type }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("jwtToken");
      const result = await fetch(
        `http://localhost:3000/appointment/${type}/${new Date()}`,
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
}
