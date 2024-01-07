import Dashboard from "./pages/Dashboard";
import "./App.css";
import AddProducts from "./pages/AddProducts";
import EditProducts from "./pages/EditProducts";
import ProductsList from "./pages/ProductsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./pages/UsersList";
import Login from "./components/Login";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUsers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="edit/:id" element={<EditProducts />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="addUsers" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
