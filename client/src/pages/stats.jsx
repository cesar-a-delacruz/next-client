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
      <Chart type={"piechart"} userData={userData} />
      <Chart type={"linechart"} userData={userData} />
      <Chart type={"barchart"} userData={userData} />
      <Chart type={"numberchart"} userData={userData} />
    </>
  );
}
