import Chart from "@/components/containers/Chart";

export default function CustomLineChart({ date }) {
  const parser = (json) => {
    const dateTimes = json.map((appointment) => {
      let dateTime = new Date(appointment.dateTime.substring(0, 10));
      dateTime.setDate(dateTime.getDate() + 1);
      return { name: dateTime.toDateString(), value: 1 };
    });
    const appointments = dateTimes.reduce((acc, { name, value }) => {
      acc[name] = (acc[name] || 0) + value;
      return acc;
    }, {});

    const days = Object.keys(appointments).map((day) => {
      return { name: day, value: appointments[day] };
    });
    return days;
  };
  return <Chart type="linechart" date={date} parser={parser} />;
}
