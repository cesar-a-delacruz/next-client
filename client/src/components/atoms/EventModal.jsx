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
        Edit
      </button>
      <button
        onClick={() => {
          handleDeleteDialog(calendarEvent.item);
          plugin.close();
        }}
      >
        Delete
      </button>
      <button onClick={() => plugin.close()}>Close</button>

      <p>
        Service: <span>{calendarEvent.title}</span>
      </p>
      <p>
        Description: <span>{calendarEvent.description}</span>
      </p>
      <p>
        Client: <span>{calendarEvent.people[0]}</span>
      </p>
      <p>
        Date & Time: <span>{calendarEvent.start.toLocaleString()}</span>
      </p>
    </div>
  );
}
