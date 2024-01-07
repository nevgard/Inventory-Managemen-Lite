import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isError && (
        <p className="text-red-500 text-xl font-normal  mb-6">{message}</p>
      )}
      <div className=" shadow-lg rounded-md p-6">
        <h1 className="text-center font-bold text-emerald-500 text-3xl">
          Login
        </h1>
        <form onSubmit={Auth}>
          <div className="flex justify-between items-center gap-x-2 mt-4 ">
            <label> Email </label>
            <input
              type="text"
              className="border p-2 focus:outline-emerald-700"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mt-4 ">
            <label> Password </label>
            <input
              type="password"
              className="border p-2 focus:outline-emerald-700"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
