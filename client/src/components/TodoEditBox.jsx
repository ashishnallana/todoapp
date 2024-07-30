import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";

function TodoEditBox({
  todoData,
  handleInputChange,
  editBoxHandler,
  handleTodoEdit,
}) {
  const [auth, setAuth] = useAuth();
  const [checked, setChecked] = useState(todoData.completed);

  const todoDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API}/todos/${todoData._id}`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        setAuth({
          ...auth,
          count: auth.count + 1,
        });
        editBoxHandler();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = (event) => {
    setChecked(!checked);
    handleInputChange("completed", checked);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-[rgba(0,0,0,0.4)] backdrop-blur-sm z-[1000]">
      <div className="bg-white p-3 rounded-md shadow-md flex flex-col space-y-7">
        <div className="flex justify-between">
          <div className="h-5 flex-1"></div>
          <CloseIcon
            onClick={editBoxHandler}
            className="p-1 rounded-full transition-all hover:bg-[rgba(0,0,0,0.2)]"
          />
        </div>
        {/* title and completed checkbox */}
        <div className="flex items-center">
          <Checkbox checked={checked} onChange={handleCheckboxChange} />
          <input
            type="text"
            placeholder="Title"
            value={todoData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="shadow-md outline-none p-2"
          />
        </div>
        {/* description */}
        <div className="flex flex-col space-y-1">
          <label className="font-bold">Description </label>
          <textarea
            type="text"
            value={todoData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Add a description for your task..."
            className="shadow-md outline-none p-2"
          />
        </div>
        {/* edit and delete btns */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleTodoEdit(todoData)}
            className="flex flex-1 rounded-full justify-center items-center bg-blue-400 transition-all hover:bg-blue-500 text-white font-bold p-2 tracking-wide"
          >
            Edit
          </button>
          <button
            onClick={() => todoDelete()}
            className="bg-blue-400 transition-all hover:bg-blue-500 text-white rounded-full h-10 w-10"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoEditBox;
