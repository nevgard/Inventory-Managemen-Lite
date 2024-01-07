import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Layouts from "./Layouts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/AuthSlice";

const AddProducts = () => {
  const [name, setName] = useState("FIBERHOME");
  const [type, setType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1104/Products", {
        name,
        type,
        serialNumber,
      });
      navigate("/");
      alert("Product added successfully");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layouts>
      <div className=" flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-xl font-normal  mb-6">{msg}</p>
        <div>
          <h1 className="font-bold  text-2xl my-3">Add Products</h1>
          <div className="shadow-lg rounded-md p-6 ">
            {" "}
            <form onSubmit={saveProduct} className=" flex  gap-3">
              <div className="input Name flex flex-col gap-2  ">
                <label> Name</label>
                <select
                  className="px-3 py-2 border rounded-md focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <option value="FIBERHOME">FIBERHOME</option>
                  <option value="HUAWEI">HUAWEI</option>
                  <option value="ZTE">ZTE</option>
                </select>
              </div>
              <div className="input type flex flex-col gap-2">
                <label> Type</label>
                <input
                  type="text"
                  placeholder="Type"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                ></input>
              </div>
              <div className="input serial_number flex flex-col gap-2">
                <label> Serial Number</label>
                <input
                  type="text"
                  placeholder="Serial Number"
                  className="px-3 py-2 border rounded-md focus:outline-emerald-500"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                ></input>
              </div>
              <div className="flex justify-end items-end gap-x-2">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  Save
                </button>
                <Link
                  to={"/"}
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

export default AddProducts;
