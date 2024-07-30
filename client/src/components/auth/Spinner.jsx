import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <p className="text-3xl font-bold mb-1">Login | Register</p>
        <p>To start using the TodoApp.</p>
        <h1 className="text-sm mt-3">
          redirecting in <strong>{count}</strong> secs
        </h1>
      </div>
    </>
  );
};

export default Spinner;
