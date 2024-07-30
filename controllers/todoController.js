const { Todo } = require("../models/todo");
const { User } = require("../models/user");

// function to get all todos of the current user
// GET REQUEST
module.exports.getTodos = async (req, res) => {
  try {
    const todos = await User.findById(req._id)
      .populate("todos")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// function to create a new todo
// POST REQUEST
module.exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({
      user: req._id,
      title,
      description,
    });
    await todo.save();

    const user = await User.findById(req._id);
    user.todos.push(todo._id);
    await user.save();

    res.status(201).send({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// function to edit a todo
// PUT REQUEST
module.exports.editTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { newTitle, newDesc, completed } = req.body;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res
        .status(200)
        .send({ success: false, message: "Todo not found" });
    }
    // Check if the user is authorized to update this todo
    if (todo.user.toString() !== req._id.toString()) {
      return res.status(200).send({
        success: false,
        message: "User not authorized to update this todo",
      });
    }
    // Update the todo with the new values
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: { title: newTitle, description: newDesc, completed: !completed },
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Todo edited successfully",
      updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// function to delete a todo
// DELETE REQUEST
module.exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res
        .status(404)
        .send({ success: false, message: "Todo not found" });
    }
    // Check if the user is authorized to delete this todo
    if (todo.user.toString() !== req._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "User not authorized to delete this todo",
      });
    }
    // Delete the todo item
    await Todo.findByIdAndDelete(todoId);
    res.status(201).send({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};
