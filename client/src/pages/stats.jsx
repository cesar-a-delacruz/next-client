import { useParams, Navigate } from "react-router-dom";
import Chart from "@/components/containers/Chart";

export default function Stats() {
  const { date } = useParams();
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <>
      <Chart type={"piechart"} date={date} />
      <Chart type={"linechart"} date={date} />
      <Chart type={"barchart"} date={date} />
      <Chart type={"numberchart"} date={date} />
    </>
  );
}
