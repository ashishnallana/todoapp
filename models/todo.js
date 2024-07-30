const { Schema, model } = require("mongoose");

const todoSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports.Todo = model("Todo", todoSchema);
