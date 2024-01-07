import React from "react";
import { Link } from "react-router-dom";

const BackButton = (props) => {
  return (
    <Link
      to={props.url}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
    >
      Back
    </Link>
  );
};

export default BackButton;
