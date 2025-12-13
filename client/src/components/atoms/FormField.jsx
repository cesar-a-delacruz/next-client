export default function Input({ field, value, showLabel, handleChange }) {
  const label = <label htmlFor={field.name}>{field.label}:</label>;
  let input;

  switch (field.type) {
    case "textarea":
      input = (
        <textarea
          name={field.name}
          value={value}
          id={field.name}
          onChange={handleChange}
        />
      );
      break;
    case "select":
      input = (
        <select
          name={field.name}
          value={value}
          id={field.name}
          onChange={handleChange}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
      break;
    case "datetime-local":
      value = (function formatLocalDateTime(date) {
        const pad = (n) => n.toString().padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
      })(new Date(value));
      input = (
        <input
          type={field.type}
          name={field.name}
          value={value}
          id={field.name}
          onChange={handleChange}
        />
      );
      break;
    default:
      input = (
        <input
          type={field.type}
          name={field.name}
          value={value}
          id={field.name}
          onChange={handleChange}
        />
      );
      break;
  }

  return (
    <>
      {showLabel && label}
      {input}
    </>
  );
}
