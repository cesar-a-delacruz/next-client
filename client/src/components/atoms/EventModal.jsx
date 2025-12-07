export default function EventModal({
  calendarEvent,
  plugin,
  handleViewDialog,
  handleDeleteDialog,
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
            handleDeleteDialog(calendarEvent.item);
            plugin.close();
          }}
        >
          Eliminar
        </button>
        <button onClick={() => plugin.close()}>Cerrar</button>
      </div>

      <p>
        Servicio: <span>{calendarEvent.title}</span>
      </p>
      <p>
        Descripción: <span>{calendarEvent.description}</span>
      </p>
      <p>
        Cliente: <span>{calendarEvent.people[0]}</span>
      </p>
      <p>
        Fecha y Hora: <span>{calendarEvent.start.toLocaleString()}</span>
      </p>
    </div>
  );
}
