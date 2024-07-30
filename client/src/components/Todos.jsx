import React from "react";
import TodoCard from "./TodoCard";

function Todos({ todos }) {
  return (
    <div>
      {todos.map((e, i) => (
        <TodoCard key={i} data={e} />
      ))}
    </div>
  );
}

export default Todos;
