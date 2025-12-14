import { jwtDecode } from "jwt-decode";
import enumTranslator from "@/utils/enumTranslator";
export default function EventModal({
  calendarEvent,
  plugin,
  handleViewDialog,
  handleDeleteDialog,
  handleUpdate,
}) {
  const userData = jwtDecode(localStorage.getItem("jwtToken"));
  return (
    <div
      style={{
        padding: "15px",
        background: "#439f9bff",
        color: "black",
        borderRadius: "10px",
        borderRight: "4px solid #a5d5d0ff",
        fontSize: "15px",
      }}
    >
      <div className="options">
        {calendarEvent.item.status !== "COMPLETED" && (
          <>
            {userData.type === "CLIENT" ? (
              <button
                onClick={() => {
                  handleViewDialog(calendarEvent.item);
                  plugin.close();
                }}
              >
                Editar
              </button>
            ) : (
              <button
                onClick={() => {
                  calendarEvent.item.status = "COMPLETED";
                  handleUpdate(calendarEvent.item);
                  plugin.close();
                }}
              >
                Completar
              </button>
            )}
            <button
              onClick={() => {
                calendarEvent.item.status = "CANCELLED";
                handleUpdate(calendarEvent.item);
                plugin.close();
              }}
            >
              Cancelar
            </button>
          </>
        )}
        <button onClick={() => plugin.close()}>Cerrar</button>
      </div>
      <div className="info">
        <p>
          Servicio: <span>{calendarEvent.title}</span>
        </p>
        <p>
          Descripción: <span>{calendarEvent.description}</span>
        </p>
        <p>
          Fecha y Hora: <span>{calendarEvent.start.toLocaleString()}</span>
        </p>
        {userData.type === "EMPLOYEE" && (
          <p>
            Cliente: <span>{calendarEvent.people[0]}</span>
          </p>
        )}
        <p>
          Estado:{" "}
          <span>
            {enumTranslator.appointmentStatus(calendarEvent.item.status)}
          </span>
        </p>
      </div>
    </div>
  );
}
