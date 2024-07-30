const { Router } = require("express");
const {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todoController");
const userMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.get("/todos", userMiddleware, getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", userMiddleware, editTodo);
router.delete("/todos/:id", userMiddleware, deleteTodo);

module.exports = router;
