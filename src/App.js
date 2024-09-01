import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import BaseLayout from '../src/components/BaseLayout'; // Import the base layout component
import { AuthContext, AuthProvider } from './context/AuthProvider';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './context/ProtectedRoute';
import Services from './components/Services';
import ToDo from './components/ToDo';
import Register from './components/Register';

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="admin-login" element={<Login />} />
        <Route path="admin-register" element={<Register />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-todo"
          element={
            <ProtectedRoute>
              <ToDo />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;