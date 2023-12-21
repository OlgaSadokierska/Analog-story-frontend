import './App.css';
import Navbar from "./layout/Navbar";
import SignIn from "./pages/SignIn";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import UserPanel from "./pages/UserPanel";
import React from 'react';
import Shop from "./pages/Shop";

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/userpanel" element={<UserPanel />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}
