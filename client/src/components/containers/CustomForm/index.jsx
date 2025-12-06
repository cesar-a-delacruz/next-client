import { useState } from "react";
import FormField from "@/components/atoms/FormField";
import requestHandlers from "@/utils/requestHandlers";
import "./index.css";

export default function CustomForm({
  title,
  fields,
  endpoint,
  action,
  submitActions,
}) {
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
    requestHandlers.send(formData, endpoint, submitActions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <div key={field.name}>
          <FormField
            field={field}
            value={formData[field.name]}
            handleChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">{action}</button>
    </form>
  );
}
