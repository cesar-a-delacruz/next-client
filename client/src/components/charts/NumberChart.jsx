import Chart from "@/components/Chart";

export default function NumberChart() {
  const parser = (json) => {
    const amount = json.reduce((acc, { service }) => {
      acc.amount = (acc.amount || 0) + service.price;
      return acc;
    }, {});
    return { name: "profit", value: amount.amount };
  };
  return <Chart type="numberchart" date="2025-11-08" parser={parser} />;
}
