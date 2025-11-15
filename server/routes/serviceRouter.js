import { Router } from "express";
const router = Router();

// GET /services - List all services
router.get("/", (req, res) => {
  res.send("Get all services");
});

// GET /services/:id - Get a single service by ID
router.get("/:id", (req, res) => {
  res.send(`Get service with ID ${req.params.id}`);
});

// POST /services - Create a new service
router.post("/", (req, res) => {
  res.send("Create a new service");
});

// PUT /services/:id - Update a service by ID
router.put("/:id", (req, res) => {
  res.send(`Update service with ID ${req.params.id}`);
});

// DELETE /services/:id - Delete a service by ID
router.delete("/:id", (req, res) => {
  res.send(`Delete service with ID ${req.params.id}`);
});

export default router;
