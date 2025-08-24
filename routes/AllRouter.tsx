// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "../routes/ProtectedRoute"

export default function AllRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        
          <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
          
        

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
