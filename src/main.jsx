import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Import your pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"; // <--- Add this import
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Notices from "./pages/Notices";
import Reports from "./pages/Reports";
import AcademicCalendar from "./pages/AcademicCalendar";
import TimeTable from "./pages/TimeTable";
import TeacherProfile from "./pages/TeacherProfile";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <--- Add this route */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/results" element={<Results />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/calendar" element={<AcademicCalendar />} />
                <Route path="/timetable" element={<TimeTable />} />
                <Route path="/profile" element={<TeacherProfile />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);