export default function NumberChart({ data }) {
  const amount = data.reduce(
    (acc, { status, service }) => {
      if (status !== "CANCELLED") acc.value = (acc.value || 0) + service.price;
      return acc;
    },
    { name: "profit", value: 0 },
  );
  return (
    <>
      <p>{amount.value} $</p>
    </>
  );
}
