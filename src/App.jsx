import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/HomePage";
import Register from "./pages/Register/RegisterPage";
import Login from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/DashboardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
