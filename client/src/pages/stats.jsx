import { useParams, Navigate } from "react-router-dom";
import CustomBarChart from "@/components/atoms/charts/CustomBarChart";
import CustomLineChart from "@/components/atoms/charts/CustomLineChart";
import CustomPieChart from "@/components/atoms/charts/CustomPieChart";
import NumberChart from "@/components/atoms/charts/NumberChart";

export default function Stats() {
  const { date } = useParams();
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <>
      <CustomPieChart date={date} />
      <CustomLineChart date={date} />
      <CustomBarChart date={date} />
      <NumberChart date={date} />
    </>
  );
}
