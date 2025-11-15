import { Router } from "express";
const router = Router();

// GET /businesss - List all businesss
router.get("/", (req, res) => {
  res.send("Get all businesss");
});

// GET /businesss/:id - Get a single business by ID
router.get("/:id", (req, res) => {
  res.send(`Get business with ID ${req.params.id}`);
});

// POST /businesss - Create a new business
router.post("/", (req, res) => {
  res.send("Create a new business");
});

// PUT /businesss/:id - Update a business by ID
router.put("/:id", (req, res) => {
  res.send(`Update business with ID ${req.params.id}`);
});

// DELETE /businesss/:id - Delete a business by ID
router.delete("/:id", (req, res) => {
  res.send(`Delete business with ID ${req.params.id}`);
});

export default router;
