export default function CustomTooltip({ active, payload, label }) {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="custom-tooltip"
      style={{
        visibility: isVisible ? "visible" : "hidden",
        backgroundColor: "white",
        color: "black",
        padding: "5px",
      }}
    >
      {isVisible && (
        <>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </>
      )}
    </div>
  );
}
