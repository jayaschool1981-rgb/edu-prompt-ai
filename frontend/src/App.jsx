import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PromptBuilder from "./pages/PromptBuilder";

/* ===========================
   AUTH HELPERS
=========================== */

const getToken = () => localStorage.getItem("token");
const getUser = () => JSON.parse(localStorage.getItem("user"));

/* ===========================
   PROTECTED ROUTE
=========================== */

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ===========================
   ROLE-BASED ROUTE (Optional Future Upgrade)
=========================== */

const RoleRoute = ({ children, allowedRoles }) => {
  const user = getUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* ===========================
   APP COMPONENT
=========================== */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Public Routes ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= Protected Routes ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prompt-builder"
          element={
            <ProtectedRoute>
              <PromptBuilder />
            </ProtectedRoute>
          }
        />

        {/* ================= Future History Route ================= */}
        {/* 
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        */}

        {/* ================= Fallback ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;