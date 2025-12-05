export default {
  findAll: async (endpoint, stateHandlers) => {
    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`http://localhost:3000/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await result.json();
    console.log(result);

    stateHandlers.forEach((handler) => handler(json));
  },
  update: async (row, endpoint, stateHandlers) => {
    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`http://localhost:3000/${endpoint}/${row.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams(row),
    });
    console.log(result);

    stateHandlers.forEach((handler) => handler());
  },
  delete: async (row, endpoint, stateHandlers) => {
    const token = localStorage.getItem("jwtToken");
    const result = await fetch(`http://localhost:3000/${endpoint}/${row.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);

    stateHandlers.forEach((handler) => handler());
  },
};
