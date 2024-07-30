import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/user/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-[black] font-semibold">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl py-3 pb-10 rounded-lg flex flex-col px-10"
      >
        <h1 className="py-10 text-5xl font-extrabold flex justify-center text_shadow">
          LOGIN
        </h1>
        <div>
          <input
            value={email}
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none placeholder:text-black text-xl py-2 border-b-2 my-2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            value={password}
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none placeholder:text-black text-xl py-2 border-b-2 my-2"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#00BF63] text-white px-3 py-2 rounded-md mt-5 mb-3"
        >
          Login
        </button>
      </form>
      <br />
      <p>
        Don't have an account?{" "}
        <Link to={"/register"} className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
