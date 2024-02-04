import './App.css';
import Navbar from "./layout/Navbar";
import SignIn from "./pages/user/SignIn";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/user/LogIn";
import UserPanel from "./pages/user/UserPanel";
import React from 'react';
import Shop from "./pages/Shop";
import AllEmployees from "./pages/admin/AllEmployees";
import OnlyUsers from "./pages/admin/OnlyUsers";
import Repository from "./pages/user/Repository";
import AddEmployee from "./pages/admin/AddEmployee";
import EditUser from "./pages/admin/EditUser";
import AddProduct from "./pages/AddProduct";
import AddMedia from "./pages/AddMedia";
import EditCamera from "./pages/EditCamera";
import UnacceptedCartsEmployee from "./pages/UnacceptedCartsEmployee";
import CartsManagementEmployee from "./pages/CartsManagementEmployee";
import CartsManagementUser from "./pages/user/CartsManagementUser";
import UpdateProduct from "./pages/UpdateProduct";

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/userpanel" element={<UserPanel />} />
                <Route path="/employees" element={<AllEmployees />} />
                <Route path="/users" element={<OnlyUsers />} />
                <Route path="/addemployee" element={<AddEmployee />} />
                <Route path="/userprofile/:userId" element={<EditUser />} />
                <Route path="/cartsEmployee" element={<CartsManagementEmployee />} />
                <Route path="/cartsUser" element={<CartsManagementUser />} />
                <Route path="/:userId/media" element={<Repository />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/" element={<Home />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/addmedia" element={<AddMedia />} />
                <Route path="/editcamera/:cameraId" element={<EditCamera />} />
                <Route path="/products/:productId" element={<UpdateProduct />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}
