import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";

import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/employees" element={<Employees />} />

      <Route path="/employees/create" element={<CreateEmployee />} />

      <Route path="/employees/edit/:id" element={<EditEmployee />} />

      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;
