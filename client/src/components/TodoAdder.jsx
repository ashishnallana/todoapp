import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { toast } from "react-toastify";

function TodoAdder() {
  const [title, setTitle] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/todos`,
        {
          title,
          description: "",
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
        setTitle("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form className="flex space-x-3" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Any new tasks?"
          className="rounded-full p-3 outline-none shadow-md leading-12"
          required
        />
        <button
          type="submit"
          className="bg-blue-400 text-white rounded-full h-12 w-12 shadow-md transition-all hover:bg-blue-500"
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default TodoAdder;
