import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
  viewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";
import ViewDialog from "@/components/containers/dialogs/ViewDialog";
import DeleteDialog from "@/components/containers/dialogs/DeleteDialog";
import requestHandlers from "@/utils/requestHandlers";
import EventModal from "@/components/atoms/EventModal";
import "./index.css";
import { jwtDecode } from "jwt-decode";

export default function Calendar({ title, fields, endpoint }) {
  const [selected, setSelected] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventModal = useState(() => createEventModalPlugin())[0];

  const handleViewDialog = (row) => {
    setSelected(row);
    setViewDialog(true);
  };
  const handleDeleteDialog = (row) => {
    setSelected(row);
    setDeleteDialog(true);
  };

  const customComponents = {
    eventModal: ({ calendarEvent }) => (
      <EventModal
        calendarEvent={calendarEvent}
        plugin={eventModal}
        handleViewDialog={handleViewDialog}
        handleDeleteDialog={handleDeleteDialog}
      />
    ),
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
    isDark: true,
  });

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("jwtToken");
      const result = await fetch(`http://localhost:3000/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);

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

  const handleUpdate = async (updatedRow) => {
    const eventHandler = () =>
      eventsService.update({
        id: updatedRow.id,
        title: updatedRow.service.name,
        description: updatedRow.service.description,
        people: [updatedRow.client.name],
        start: startEnd,
        end: startEnd.add({ minutes: 60 }),
        item: updatedRow,
      });
    const viewDialogHandler = () => setViewDialog(false);
    await requestHandlers.update(updatedRow, endpoint, [
      eventHandler,
      viewDialogHandler,
    ]);
  };
  const handleDelete = async (deletedRow) => {
    const eventHandler = () => eventsService.remove(deletedRow.id);
    const deleteDialogHandler = () => setDeleteDialog(false);
    await requestHandlers.delete(deletedRow, endpoint, [
      eventHandler,
      deleteDialogHandler,
    ]);
  };

  return (
    <>
      <h2>{title}</h2>
      {(() => {
        const userData = jwtDecode(localStorage.getItem("jwtToken"));
        return (
          userData.type === "CLIENT" && (
            <div className="links">
              <a href={`/${endpoint}/new`}>Nuevo</a>
            </div>
          )
        );
      })()}
      <ScheduleXCalendar
        customComponents={customComponents}
        calendarApp={calendar}
      />

      <ViewDialog
        open={viewDialog}
        onClose={() => setViewDialog(false)}
        data={selected}
        onUpdate={handleUpdate}
        fields={fields}
        viewMode={false}
      />
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        data={selected}
        onDelete={handleDelete}
        fields={fields}
      />
    </>
  );
}
