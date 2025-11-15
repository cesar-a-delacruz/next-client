import { Router } from "express";
const router = Router();

// GET /clients - List all clients
router.get("/", (req, res) => {
  res.send("Get all clients");
});

// GET /clients/:id - Get a single client by ID
router.get("/:id", (req, res) => {
  res.send(`Get client with ID ${req.params.id}`);
});

// POST /clients - Create a new client
router.post("/", (req, res) => {
  res.send("Create a new client");
});

// PUT /clients/:id - Update a client by ID
router.put("/:id", (req, res) => {
  res.send(`Update client with ID ${req.params.id}`);
});

// DELETE /clients/:id - Delete a client by ID
router.delete("/:id", (req, res) => {
  res.send(`Delete client with ID ${req.params.id}`);
});

export default router;
