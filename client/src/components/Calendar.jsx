import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
  viewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";

function CalendarApp({ title, fields, endpoint }) {
  const [calendarData, setCalendarData] = useState([]);
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    events: calendarData,
    plugins: [eventsService],
    locale: "es-ES",
    dayBoundaries: {
      start: "00:00",
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
        };
      });
      setCalendarData([...events]);
      eventsService.set(events);
    })();
    eventsService.getAll();
  }, []);

  return (
    <>
      <h2>{title}</h2>
      <ScheduleXCalendar calendarApp={calendar} />
    </>
  );
}

export default CalendarApp;
