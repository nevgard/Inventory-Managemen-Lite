import React, { useEffect, Children } from "react";
import { Sidebar } from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const Layouts = (props) => {
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
  return (
    <div className="min-h-screen  flex">
      <Sidebar></Sidebar>
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Layouts;
