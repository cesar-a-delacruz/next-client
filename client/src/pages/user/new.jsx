import { useState } from "react";

function NewUser() {
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    password: null,
    type: "CLIENT",
    businessId: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:3000/user", {
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
      <h2>New User</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Type:</label>
        <input
          type="radio"
          name="type"
          value="CLIENT"
          checked={formData.type === "CLIENT"}
          onChange={handleChange}
        />
        <span>Client</span>
        <input
          type="radio"
          name="type"
          value="EMPLOYEE"
          checked={formData.type === "EMPLOYEE"}
          onChange={handleChange}
        />
        <span>Employee</span>
      </div>
      <div>
        <label>Business:</label>
        <select
          name="bussinessId"
          onChange={handleChange}
          value={formData.businessId}
        ></select>
      </div>

      <button type="submit">Create</button>
    </form>
  );
}

export default NewUser;
