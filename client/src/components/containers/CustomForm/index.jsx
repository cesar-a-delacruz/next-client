import { useEffect, useState } from "react";
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
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    const initialState = fields.reduce((acc, field) => {
      acc[field.name] = field.default || "";
      return acc;
    }, {});
    setFormData(initialState);
  }, [fields.length]);

  const handleChange = (e) => {
    const value = e.target.value;
    const newData = { ...formData, [e.target.name]: value };
    if (e.target.files) newData.file = e.target.files[0];
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.file)
      requestHandlers.sendWithFile(formData, endpoint, submitActions);
    else requestHandlers.send(formData, endpoint, submitActions);
  };

  if (formData)
    return (
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        {fields.map((field) => (
          <div key={field.name}>
            <FormField
              field={field}
              value={field.value ? field.value : formData[field.name]}
              showLabel={field.label === undefined ? false : true}
              handleChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">{action}</button>
      </form>
    );
}
