import './App.css';
import Navbar from "./layout/Navbar";
import SignIn from "./pages/SignIn";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import UserPanel from "./pages/UserPanel";
import React from 'react';
import Shop from "./pages/Shop";
import AllEmployees from "./pages/admin/AllEmployees";
import OnlyUsers from "./pages/admin/OnlyUsers";
import Repository from "./pages/Repository";
import AddEmployee from "./pages/admin/AddEmployee";
import EditUser from "./pages/admin/EditUser";
import AddProduct from "./pages/AddProduct";
import AddMedia from "./pages/AddMedia";
import EditCamera from "./pages/EditCamera";

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
                <Route path="/:userId/media" element={<Repository />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/" element={<Home />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/addmedia" element={<AddMedia />} />
                <Route path="/editcamera/:cameraId" element={<EditCamera />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}
