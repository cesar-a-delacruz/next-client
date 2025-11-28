import { useParams } from "react-router-dom";
import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomPieChart from "@/components/charts/CustomPieChart";
import NumberChart from "@/components/charts/NumberChart";

export default function Stats() {
  const { date } = useParams();
  return (
    <>
      <CustomPieChart date={date} />
      <CustomLineChart date={date} />
      <CustomBarChart date={date} />
      <NumberChart date={date} />
    </>
  );
}
