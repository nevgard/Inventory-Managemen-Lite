import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddButton from "./AddButton";
import BackButton from "./BackButton";

const CardUsers = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:1104/users/${id}`);
    getUsers();
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:1104/users/");
    setUsers(response.data);
  };
  return (
    <div className="flex flex-col justify-start">
      <div className="w-fit">
        <h1 className="font-bold text-2xl">Users List</h1>
      </div>
      {props.children}

      <div className=" shadow-lg p-6 mt-3">
        <table className="min-w-full text-left text-sm ">
          <thead className="border-b border-black">
            <tr>
              <th className="px-6 pb-3">No</th>
              <th className="px-6 pb-3">Name</th>
              <th className="px-6 pb-3">Email</th>
              <th className="px-6 pb-3">Role</th>
              <th className="px-6 pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td>
                  <Link
                    to={`/user/edit/${user.uuid}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.uuid)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardUsers;
