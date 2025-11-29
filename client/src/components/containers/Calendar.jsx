import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
  viewMonthGrid,
  viewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";
import ViewDialog from "@/components/containers/dialogs/ViewDialog";
import DeleteDialog from "@/components/containers/dialogs/DeleteDialog";

function CalendarApp({ title, fields, endpoint }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventModal = useState(() => createEventModalPlugin())[0];

  const customComponents = {
    eventModal: ({ calendarEvent }) => {
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
              eventModal.close();
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleDeleteDialog(calendarEvent.item);
              eventModal.close();
            }}
          >
            Delete
          </button>
          <button onClick={() => eventModal.close()}>Close</button>

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
    },
  };

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    plugins: [eventsService, eventModal],
    locale: "es-ES",
    dayBoundaries: {
      start: "09:00",
      end: "21:00",
    },
    weekOptions: {
      timeAxisFormatOptions: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      },
    },
    defaultView: viewWeek.name,
    showWeekNumbers: true,
    isResponsive: true,
  });

  useEffect(() => {
    (async () => {
      const result = await fetch(`http://localhost:3000/${endpoint}`);
      const json = await result.json();
      const events = json.map((appointment) => {
        let dateTime = new Date(appointment.dateTime)
          .toISOString()
          .replace("T", " ")
          .replace(".000Z", "");
        const [date, time] = dateTime.split(" ");
        const [year, month, day] = date.split("-");
        const [hour, minute, seconds] = time.split(":");

        const startEnd = Temporal.ZonedDateTime.from({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          hour: parseInt(hour - 5),
          minute: parseInt(minute),
          timeZone: "UTC",
        });
        return {
          id: appointment.id,
          title: appointment.service.name,
          description: appointment.service.description,
          people: [appointment.client.name],
          start: startEnd,
          end: startEnd.add({ minutes: 60 }),
          item: appointment,
        };
      });
      eventsService.set(events);
    })();
    eventsService.getAll();
  }, []);

  const handleViewDialog = (row) => {
    setSelectedRow(row);
    setViewDialog(true);
  };
  const handleDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialog(true);
  };

  const handleUpdate = async (updatedRow) => {
    await fetch(`http://localhost:3000/${endpoint}/${updatedRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(updatedRow),
    });
    eventsService.update({
      id: updatedRow.id,
      title: updatedRow.service.name,
      description: updatedRow.service.description,
      people: [updatedRow.client.name],
      start: startEnd,
      end: startEnd.add({ minutes: 60 }),
      item: updatedRow,
    });
    setViewDialog(false);
  };
  const handleDelete = async (deletedRow) => {
    await fetch(`http://localhost:3000/${endpoint}/${deletedRow.id}`, {
      method: "DELETE",
    });
    eventsService.remove(deletedRow.id);
    setDeleteDialog(false);
  };

  return (
    <>
      <h2>{title}</h2>
      <ScheduleXCalendar
        customComponents={customComponents}
        calendarApp={calendar}
      />

      <ViewDialog
        open={viewDialog}
        onClose={() => setViewDialog(false)}
        data={selectedRow}
        onUpdate={handleUpdate}
        fields={fields}
        viewMode={false}
      />
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        data={selectedRow}
        onDelete={handleDelete}
        fields={fields}
      />
    </>
  );
}

export default CalendarApp;
