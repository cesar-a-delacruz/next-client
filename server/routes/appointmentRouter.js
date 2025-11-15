import { Router } from "express";
const router = Router();

// GET /appointments - List all appointments
router.get("/", (req, res) => {
  res.send("Get all appointments");
});

// GET /appointments/:id - Get a single appointment by ID
router.get("/:id", (req, res) => {
  res.send(`Get appointment with ID ${req.params.id}`);
});

// POST /appointments - Create a new appointment
router.post("/", (req, res) => {
  res.send("Create a new appointment");
});

// PUT /appointments/:id - Update a appointment by ID
router.put("/:id", (req, res) => {
  res.send(`Update appointment with ID ${req.params.id}`);
});

// DELETE /appointments/:id - Delete a appointment by ID
router.delete("/:id", (req, res) => {
  res.send(`Delete appointment with ID ${req.params.id}`);
});

export default router;
