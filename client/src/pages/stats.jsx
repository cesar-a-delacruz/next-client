import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomPieChart from "@/components/charts/CustomPieChart";
import NumberChart from "@/components/charts/NumberChart";

export default function Stats() {
    return <>
        <CustomPieChart />
        <CustomLineChart />
        <NumberChart />
    </>
};
