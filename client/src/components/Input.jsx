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
