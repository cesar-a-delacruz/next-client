export default function (dateTime) {
  dateTime = new Date(dateTime);
  dateTime.setHours(dateTime.getHours() - 5);
  dateTime = dateTime.toISOString().replace("T", " ").replace(".000Z", "");

  const [date, time] = dateTime.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minute, seconds] = time.split(":");

  return Temporal.ZonedDateTime.from({
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    hour: parseInt(hour),
    minute: parseInt(minute),
    timeZone: "UTC",
  });
}
