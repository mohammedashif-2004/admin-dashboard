import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Notices from "./pages/Notices";
import Reports from "./pages/Reports";


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/results" element={<Results />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/reports" element={<Reports />} />

        </Routes>
    </BrowserRouter>
);
