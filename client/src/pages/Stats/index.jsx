import { Navigate } from "react-router-dom";
import Chart from "@/components/containers/Chart";
import { jwtDecode } from "jwt-decode";
import "./index.css";

export default function Stats() {
  const token = localStorage.getItem("jwtToken");
  let userData;
  if (!token) return <Navigate to="/auth" replace />;
  else userData = jwtDecode(token);

  if (userData.type !== "EMPLOYEE") return <Navigate to="/auth" replace />;
  document.title = "Next Client: Estadísticas";
  const today = new Date().toISOString();
  const date = today.substring(0, today.lastIndexOf("T"));
  return (
    <>
      <h2>Estadísticas</h2>
      <div className="chart-container">
        <Chart
          type={"numberchart"}
          title={"Ganancia de hoy"}
          initialDate={date}
        />
        <Chart
          type={"piechart"}
          title={"Estados de la citas de hoy"}
          initialDate={date}
        />
        <Chart
          type={"linechart"}
          title={"Cantidad de citas en la semana"}
          initialDate={date}
        />
        <Chart
          type={"barchart"}
          title={"Servicios más solicitados en la semana"}
          initialDate={date}
        />
      </div>
    </>
  );
}
