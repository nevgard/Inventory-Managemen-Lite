import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CardUsers from "../components/CardUsers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import BackButton from "../components/BackButton";
import AddButton from "../components/AddButton";
import Layouts from "./Layouts";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.role !== "admin") {
      navigate("/");
      alert("You do not have permission to access this page");
    }
  }, [isError, user, navigate]);
  return (
    <Layouts>
      <div className=" flex flex-col justify-center items-center h-screen">
        <div className="text-start">
          <CardUsers>
            <AddButton url="/addUsers" />
          </CardUsers>
          <div className=" mt-6 text-end">
            <BackButton url="/" />
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default UsersList;
