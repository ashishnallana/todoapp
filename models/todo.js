const { Schema, model } = require("mongoose");
// const {User} = require("./user")

const todoSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports.Todo = model("Todo", todoSchema);
