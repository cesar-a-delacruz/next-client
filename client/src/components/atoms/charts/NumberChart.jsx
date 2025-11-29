import Chart from "@/components/containers/Chart";

export default function NumberChart({ date }) {
  const parser = (json) => {
    const amount = json.reduce((acc, { service }) => {
      acc.amount = (acc.amount || 0) + service.price;
      return acc;
    }, {});
    return { name: "profit", value: amount.amount };
  };
  return <Chart type="numberchart" date={date} parser={parser} />;
}
