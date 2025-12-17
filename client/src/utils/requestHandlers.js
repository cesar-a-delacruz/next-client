export default {
  send: async (formData, endpoint, handlers) => {
    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`${import.meta.env.VITE_SERVER}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams(formData),
    });
    const json = await result.json();
    console.log(result);

    handlers.forEach((handler) => handler(json));
  },
  sendForAuth: async (formData, endpoint, handlers) => {
    const result = await fetch(`${import.meta.env.VITE_SERVER}/${endpoint}`, {
      method: "POST",
      body: new URLSearchParams(formData),
    });
    const json = await result.json();
    console.log(result);

    handlers.forEach((handler) => handler(json));
  },
  sendWithFile: async (formData, endpoint, handlers) => {
    const data = new FormData();
    for (const field in formData) {
      data.append(field, formData[field]);
    }

    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`${import.meta.env.VITE_SERVER}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const json = await result.json();
    console.log(result);

    handlers.forEach((handler) => handler(json));
  },
  findAll: async (endpoint, stateHandlers) => {
    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`${import.meta.env.VITE_SERVER}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await result.json();
    console.log(result);

    stateHandlers.forEach((handler) => handler(json));
  },
  update: async (row, endpoint, stateHandlers) => {
    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`${import.meta.env.VITE_SERVER}/${endpoint}/${row.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams(row),
    });
    console.log(result);

    stateHandlers.forEach((handler) => handler());
  },
  delete: async (row, endpoint, stateHandlers) => {
    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`${import.meta.env.VITE_SERVER}/${endpoint}/${row.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);

    stateHandlers.forEach((handler) => handler());
  },
};
