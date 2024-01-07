import React from "react";
import { Link } from "react-router-dom";

const AddButton = (props) => {
  return (
    <Link to={props.url}>
      {" "}
      <h1 className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 w-fit py-3 rounded-md">
        Add New
      </h1>
    </Link>
  );
};

export default AddButton;
