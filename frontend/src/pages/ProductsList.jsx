import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardProducts from "../components/CardProducts";
import AddButton from "../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import Layouts from "./Layouts";
import BackButton from "../components/BackButton";

const ProductsList = () => {
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
    <Layouts>
      <div className=" flex flex-col justify-center items-center h-screen">
        <div className="text-start ">
          <CardProducts>
            <AddButton url="/addProducts" />
          </CardProducts>
          <div className="mt-6 text-end">
            <BackButton url="/" />
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default ProductsList;
