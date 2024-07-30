import React, { useEffect, useState } from "react";
import TodoAdder from "../components/TodoAdder";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";
import Todos from "../components/Todos";

export const truncate = (text) => {
  if (text.length > 100) {
    return text.slice(0, 60) + "...";
  }
  return text;
};

function Home() {
  const [todos, setTodos] = useState([]);
  const [auth, setAuth] = useAuth();

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/todos`, {
        headers: {
          authorization: auth.token,
        },
      });
      if (res.data.success) {
        setTodos(res.data.todos.todos);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
      <h1 className="text-3xl font-extrabold tracking-wider">TODOAPP</h1>
      <TodoAdder />
      <Todos todos={todos} />
    </div>
  );
}

export default Home;
