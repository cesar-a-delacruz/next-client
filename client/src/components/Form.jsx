import { useState } from "react";

export default function Form({ title, fields, endpoint, action }) {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = field.default || "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(`http://localhost:3000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });
    console.log("Response:", result);
  };

  const getFieldElement = (field) => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        );
      case "select":
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          >
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
              checked={formData[field.name] === opt.value}
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
            value={formData[field.name]}
            onChange={handleChange}
          />
        );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          {getFieldElement(field)}
        </div>
      ))}
      <button type="submit">{action}</button>
    </form>
  );
}
