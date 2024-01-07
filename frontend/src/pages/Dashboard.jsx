import React, { useEffect } from "react";

import Layouts from "./Layouts";
import ProductsList from "./ProductsList";
import UsersList from "./UsersList";
import CardProducts from "../components/CardProducts";
import CardUsers from "../components/CardUsers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);
  return (
    <>
      <Layouts>
        <div className="w-full flex flex-col justify-center items-center h-screen gap-y-24">
          <h1 className="capitalize text-3xl font-light">
            Welcome back {user && user.name}
          </h1>
          <CardProducts></CardProducts>

          {user && user.role === "admin" && <CardUsers></CardUsers>}
        </div>
      </Layouts>
    </>
  );
};

export default Dashboard;
