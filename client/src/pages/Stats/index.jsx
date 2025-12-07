import { Navigate } from "react-router-dom";
import Chart from "@/components/containers/Chart";
import { jwtDecode } from "jwt-decode";

export default function Stats() {
  const token = localStorage.getItem("jwtToken");
  let userData;
  if (!token) return <Navigate to="/auth" replace />;
  else userData = jwtDecode(token);

  if (userData.type !== "EMPLOYEE") return <Navigate to="/auth" replace />;
  document.title = "Next Client: Estadísticas";

  return (
    <>
      <h2>Estadísticas</h2>
      <Chart type={"numberchart"} title={"Ganancia de hoy"} />
      <Chart type={"piechart"} title={"Estados de la citas de hoy"} />
      <Chart type={"linechart"} title={"Cantidad de citas en la semana"} />
      <Chart
        type={"barchart"}
        title={"Servicios más solicitados en la semana"}
      />
    </>
  );
}
