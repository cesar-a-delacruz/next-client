export default function NumberChart({ data }) {
  const amount = data.reduce(
    (acc, { service }) => {
      acc.value = (acc.value || 0) + service.price;
      return acc;
    },
    { name: "profit", value: 0 },
  );
  return (
    <>
      <div>
        {amount.name}
        <p>{amount.value} $</p>
      </div>
    </>
  );
}
