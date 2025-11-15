import { useState } from "react";

function NewBusiness() {
  const [formData, setFormData] = useState({
    name: "",
    description: null,
    phone: "",
    logo: null,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:3000/business", {
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
      <h2>New Business</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
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
          required
        />
      </div>

      <div>
        <label>Logo URL:</label>
        <input
          type="text"
          name="logo"
          value={formData.logo}
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
          required
        />
      </div>

      <button type="submit">Create</button>
    </form>
  );
}

export default NewBusiness;
