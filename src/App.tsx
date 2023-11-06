import './App.css';
import Navbar from "./layout/Navbar";
import SignIn from "./pages/SignIn";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}
