import { Router } from "express";
const router = Router();

// GET /users - List all users
router.get("/", (req, res) => {
  res.send("Get all users");
});

// GET /users/:id - Get a single user by ID
router.get("/:id", (req, res) => {
  res.send(`Get user with ID ${req.params.id}`);
});

// POST /users - Create a new user
router.post("/", (req, res) => {
  res.send("Create a new user");
});

// PUT /users/:id - Update a user by ID
router.put("/:id", (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

// DELETE /users/:id - Delete a user by ID
router.delete("/:id", (req, res) => {
  res.send(`Delete user with ID ${req.params.id}`);
});

export default router;
