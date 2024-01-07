import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Layouts from "./Layouts";
import BackButton from "../components/BackButton";
import { LiaEyeSolid } from "react-icons/lia";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    getUserById();
  }, [id]);

  const navigate = useNavigate();

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:1104/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/");
      alert("Product updated successfully");
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:1104/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layouts>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex ">
          <p className="text-red-500 text-xl">{msg}</p>
        </div>

        <div className=" ">
          <div className="flex justify-start w-content">
            <h1 className="font-bold  text-left text-2xl my-3">Edit Users</h1>
          </div>
          <div className="shadow-lg rounded-md p-6 ">
            {" "}
            <form onSubmit={updateUser} className=" flex  gap-3">
              <div className="input Name flex flex-col gap-2  ">
                <label> Name</label>
                <input
                  type="text"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input email flex flex-col gap-2">
                <label> Email</label>
                <input
                  type="text"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="input password flex flex-col gap-2">
                <label>Password</label>
                <input
                  type="password"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="input confPassword flex flex-col gap-2">
                <label> Confirm Password</label>
                <input
                  type="password"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={confPassword}
                  placeholder="********"
                  onChange={(e) => setConfPassword(e.target.value)}
                ></input>
              </div>
              <div className="input serial_number flex flex-col gap-2">
                <label> Role</label>
                <select
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
                  Update
                </button>
                <BackButton url="/users" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default EditUser;
