import { Navigate } from "react-router-dom";
import Chart from "@/components/containers/Chart";
import { jwtDecode } from "jwt-decode";

export default function Stats() {
  const token = localStorage.getItem("jwtToken");
  let userData;
  if (!token) return <Navigate to="/auth" replace />;
  else userData = jwtDecode(token);

  if (userData.type !== "EMPLOYEE") return;
  return (
    <>
      <Chart type={"piechart"} />
      <Chart type={"linechart"} />
      <Chart type={"barchart"} />
      <Chart type={"numberchart"} />
    </>
  );
}
