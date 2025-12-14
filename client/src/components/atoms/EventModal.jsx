import { jwtDecode } from "jwt-decode";
import enumTranslator from "@/utils/enumTranslator";
export default function EventModal({
  calendarEvent,
  plugin,
  handleViewDialog,
  handleDeleteDialog,
  handleUpdate,
}) {
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
      {(() => {
        const userData = jwtDecode(localStorage.getItem("jwtToken"));
        return (
          userData.type === "CLIENT" && (
            <>
              <div className="options">
                <button
                  onClick={() => {
                    handleViewDialog(calendarEvent.item);
                    plugin.close();
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    calendarEvent.item.status = "CANCELLED";
                    handleUpdate(calendarEvent.item);
                    plugin.close();
                  }}
                >
                  Cancelar
                </button>
              </div>
              <div className="info">
                <p>
                  Servicio: <span>{calendarEvent.title}</span>
                </p>
                <p>
                  Descripción: <span>{calendarEvent.description}</span>
                </p>
                <p>
                  Fecha y Hora:{" "}
                  <span>{calendarEvent.start.toLocaleString()}</span>
                </p>
                <p>
                  Estado:{" "}
                  <span>
                    {enumTranslator.appointmentStatus(
                      calendarEvent.item.status,
                    )}
                  </span>
                </p>
              </div>
            </>
          )
        );
      })()}

      <button onClick={() => plugin.close()}>Cerrar</button>
    </div >
  );
}
