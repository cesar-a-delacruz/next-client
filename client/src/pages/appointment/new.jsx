import { useState } from "react";

function NewAppointment() {
  const [formData, setFormData] = useState({
    dateTime: "",
    serviceId: "",
    clientId: null,
    status: "PENDING",
    businessId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:3000/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });
    console.log("Response:", result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Appointment</h2>

      <div>
        <label>Date & Time:</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Service:</label>
        <input
          type="number"
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Client:</label>
        <input
          type="number"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="PENDING">Pending</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div>
        <label>Business:</label>
        <input
          type="number"
          name="businessId"
          value={formData.businessId}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Create</button>
    </form>
  );
}

export default NewAppointment;
