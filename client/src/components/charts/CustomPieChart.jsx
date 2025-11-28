import Chart from "@/components/Chart";

export default function CustomPieChart({ date }) {
  const parser = (json) => {
    const appointments = {
      completed: 0,
      pending: 0,
      cancelled: 0,
    };
    json.forEach((item) => {
      switch (item.status) {
        case "PENDING":
          appointments.pending++;
          break;
        case "COMPLETED":
          appointments.completed++;
          break;
        case "CANCELLED":
          appointments.cancelled++;
          break;
      }
    });
    let statuses = [];
    for (const status in appointments) {
      statuses.push({ name: status, value: appointments[status] });
    }
    return statuses;
  };
  return <Chart type="piechart" date={date} parser={parser} />;
}
