export default function Input({ field, value, handleChange }) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea name={field.name} value={value} onChange={handleChange} />
      );
    case "select":
      return (
        <select name={field.name} value={value} onChange={handleChange}>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case "radio":
      return field.options.map((opt) => (
        <span key={opt.value}>
          <input
            type="radio"
            name={field.name}
            value={opt.value}
            checked={value === opt.value}
            onChange={handleChange}
          />
          {opt.label}
        </span>
      ));
    case "datetime-local":
      value = (function formatLocalDateTime(date) {
        const pad = (n) => n.toString().padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
      })(new Date(value));
      return (
        <input
          type={field.type}
          name={field.name}
          value={value}
          onChange={handleChange}
        />
      );
    default:
      return (
        <input
          type={field.type}
          name={field.name}
          value={value}
          onChange={handleChange}
        />
      );
  }
}
