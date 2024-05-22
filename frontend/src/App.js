import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import ProtectedRoute from "./components/ProtectedRoute";
import GroupProtectedRoute from "./components/GroupProtectedRoute";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import { AuthProvider } from "./context/AuthContext";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <AuthProvider>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <GroupProtectedRoute requiredGroup={3}>
              <Dashboard />
            </GroupProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <GroupProtectedRoute requiredGroup={4}>
              <Schedule />
            </GroupProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
