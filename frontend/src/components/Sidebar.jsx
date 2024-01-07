import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBox, FaUserLarge } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/AuthSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const showConfirmBox = () => {
    setShowPopup(!showPopup);
  };
  const hideConfirmBox = () => {
    showConfirmBox();
  };

  const logout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div className="h-screen">
      <aside className="h-screen text-black w-64 shadow-lg">
        <div className="text-center p-6">
          <Link to={"/"} className="font-bold text-4xl text-emerald-800">
            Dashboard
          </Link>
        </div>
        <div className="mx-4 px-4 py-2 bg-emerald-200 rounded-md">
          {user && <h1 className="uppercase text-2xl">{user.name}</h1>}
          {user && (
            <h1 className="uppercase mt-1.5 font-light text-sm">{user.role}</h1>
          )}
        </div>
        <nav className="mt-12 ">
          <div className=" mt-3 mx-4 px-2 py-2 text-xl transition ease-in-out rounded-md hover:scale-105 hover:bg-emerald-50 hover:bg-opacity-80">
            <Link to={"/products"} className="flex justify-start items-center">
              {" "}
              <FaBox />
              <span className="px-3 ">Products</span>
            </Link>
          </div>
          {user && user.role === "admin" && (
            <div className=" mt-3 mx-4 px-2 py-2 text-xl transition ease-in-out rounded-md hover:scale-105  hover:bg-emerald-50 hover:bg-opacity-80">
              <Link to={"/users"} className="flex justify-start items-center">
                {" "}
                <FaUserLarge />
                <span className="px-3">Users</span>
              </Link>
            </div>
          )}
        </nav>

        <div className=" fixed bottom-0 my-4 justify-end">
          <button
            onClick={showConfirmBox}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3 mx-4"
          >
            Logout
          </button>
        </div>
      </aside>
      {showPopup && (
        <div className=" shadow bg-white z-10 lg p-6 absolute  top-0 right-1/3">
          <p className="text-xl">Are you sure you want to logout?</p>
          <button
            onClick={logout}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-3 me-2"
          >
            Yes
          </button>
          <button
            onClick={hideConfirmBox}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};
