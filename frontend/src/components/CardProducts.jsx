import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CardProducts = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:1104/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    const response = await axios.get("http://localhost:1104/products/");
    setProducts(response.data);
  };
  return (
    <div className="flex flex-col justify-start">
      <h1 className="font-bold text-2xl ">Product List </h1>
      {props.children}
      <div className=" shadow-lg p-6 mt-3">
        <table className="min-w-full text-left text-sm ">
          <thead className="border-b border-black">
            <tr>
              <th className="px-6 pb-3">No</th>
              <th className="px-6 pb-3">Name</th>
              <th className="px-6 pb-3">Type</th>
              <th className="px-6 pb-3">Serial Number</th>
              <th className="px-6 pb-3">User</th>
              <th className="px-6 pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.uuid}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 uppercase">{product.name}</td>
                <td className="px-6 py-4 uppercase">{product.type}</td>
                <td className="px-6 py-4 uppercase">{product.serialNumber}</td>
                <td className="px-6 py-4 capitalize">{product.user.name}</td>
                <td>
                  <Link
                    to={`/edit/${product.uuid}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.uuid)}
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

export default CardProducts;
