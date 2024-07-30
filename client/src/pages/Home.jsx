import React, { useEffect, useState } from "react";
import TodoAdder from "../components/TodoAdder";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";
import Todos from "../components/Todos";
import Loader from "../components/Loader";

export const truncate = (text) => {
  if (text.length > 100) {
    return text.slice(0, 60) + "...";
  }
  return text;
};

function Home() {
  const [todos, setTodos] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/todos`, {
        headers: {
          authorization: auth.token,
        },
      });
      if (res.data.success) {
        setTodos(res.data.todos);
        setLoading(false);
        // console.log(res.data.todos);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setTodos([]);
    fetchTodos();
  }, [auth.count]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-3 p-5">
      <h1 className="text-3xl font-extrabold tracking-wider">TODOAPP</h1>
      <TodoAdder />
      {loading && <Loader />}
      {todos.length >= 1 && <Todos todos={todos} />}
      {todos.length == 0 && (
        <h3 className="text-sm opacity-80">Add tasks to see them here!</h3>
      )}
    </div>
  );
}

export default Home;
