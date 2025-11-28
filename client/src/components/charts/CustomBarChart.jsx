import Chart from "@/components/Chart";

export default function CustomBarChart() {
  const parser = (json) => {
    const dateTimes = json.map((appointment) => {
      return { name: appointment.service.name, value: 1 };
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
  return <Chart type="barchart" date="2025-11-08" parser={parser} />;
}
