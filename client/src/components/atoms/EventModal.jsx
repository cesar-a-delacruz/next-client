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
        background: "#cadfd2ff",
        color: "black",
        borderRadius: "10px",
        borderRight: "4px solid #439f66ff",
        fontSize: "15px",
      }}
    >
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
