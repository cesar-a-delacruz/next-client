import { useState } from "react";

function NewService() {
  const [formData, setFormData] = useState({
    name: "",
    description: null,
    price: "",
    image: null,
    businessId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:3000/service", {
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
      <h2>New Service</h2>

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
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Business:</label>
        <input
          type="number"
          name="businessId"
          value={formData.businessId}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Create</button>
    </form>
  );
}

export default NewService;
