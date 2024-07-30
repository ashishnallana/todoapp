import React, { useEffect, useState } from "react";
import { truncate } from "../pages/Home";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useAuth } from "../context/Auth";
import TodoEditBox from "./TodoEditBox";
import { toast } from "react-toastify";

function TodoCard({ data }) {
  const [todoData, setTodoData] = useState(data);
  const [auth, setAuth] = useAuth();
  const [editBox, setEditBox] = useState(false);

  // Handler for input changes
  const handleInputChange = (field, value) => {
    setTodoData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleTodoEdit = async (todoObj) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API}/todos/${todoObj._id}`,
        {
          newTitle: todoObj.title,
          newDesc: todoObj.description,
          completed: todoObj.completed,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        setAuth({
          ...auth,
          count: auth.count + 1,
        });
        setEditBox(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="m-3 shadow-md rounded-md min-w-[300px]">
      <div
        className={`p-3 rounded-md ${
          data.completed && "opacity-70 bg-[rgba(0,0,0,0.1)]"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2
            className="font-semibold text-lg cursor-pointer"
            onClick={() => setEditBox(true)}
          >
            {data.title}
          </h2>
          <div className="flex space-x-2 items-center">
            <Checkbox
              checked={todoData.completed}
              onChange={() =>
                handleInputChange("completed", !todoData.completed)
              }
              onClick={() => handleTodoEdit(todoData)}
            />
          </div>
        </div>
        <p className="text-sm opacity-90">{truncate(data.description)}</p>
      </div>
      {/* ${
        data.completed && "opacity-70 bg-[rgba(0,0,0,0.1)]"
      } */}
      {editBox && (
        <TodoEditBox
          todoData={todoData}
          handleInputChange={handleInputChange}
          editBoxHandler={() => setEditBox(false)}
          handleTodoEdit={handleTodoEdit}
        />
      )}
    </div>
  );
}

export default TodoCard;
