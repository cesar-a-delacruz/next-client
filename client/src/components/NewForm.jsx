import { useState } from "react";
import FormField from "@/components/FormField";

export default function NewForm({ title, fields, endpoint, action, tokenSetter }) {
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
    const token = localStorage.getItem('jwtToken');
    const result = await fetch(`http://localhost:3000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`
      },
      body: new URLSearchParams(formData),
    });
    if (tokenSetter) {
      const data = await result.json()
      localStorage.setItem('jwtToken', data.token);
    }
    console.log("Response:", result);
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
