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
router.post("/todos", userMiddleware, createTodo);
router.put("/todos/:todoId", userMiddleware, editTodo);
router.delete("/todos/:todoId", userMiddleware, deleteTodo);

module.exports = router;
