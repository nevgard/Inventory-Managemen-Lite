import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Layouts from "./Layouts";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1104/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
      alert("User added successfully");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layouts>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-xl font-normal  mb-6">{msg}</p>
        <div>
          <h1 className="font-bold  text-2xl my-3">Add Users</h1>
          <div className="shadow-lg rounded-md p-6 ">
            {" "}
            <form onSubmit={saveUser} className=" flex  gap-3">
              <div className="input Name flex flex-col gap-2  ">
                <label> Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input email flex flex-col gap-2">
                <label> Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="input password flex flex-col gap-2">
                <label> Password</label>
                <input
                  type="password"
                  placeholder="*****"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="input confPassword flex flex-col gap-2">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="*****"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                ></input>
              </div>
              <div className="select role flex flex-col items-center gap-2">
                <label>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                >
                  <option value="user">USER</option>
                  <option value="admin">ADMIN</option>
                </select>
              </div>
              <div className="flex justify-end items-end gap-x-2">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  Save
                </button>
                <Link
                  to={"/users"}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default AddUser;
