import React, { useEffect, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const ProtectedRoute = useMemo(() => {
    return ({ children }) => {
      if (isCheckingAuth) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-400">
            <div className="text-lg font-semibold">Loading...</div>
          </div>
        );
      }

      if (!authUser) {
        return <Navigate to="/login" replace />;
      }
      return children;
    };
  }, [authUser, isCheckingAuth]);

  const PublicRoute = useMemo(() => {
    return ({ children }) => {
      if (isCheckingAuth) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-red-200">
            <div className="text-lg font-semibold">Loading...</div>
          </div>
        );
      }

      if (authUser) {
        return <Navigate to="/" replace />;
      }

      return children;
    };
  }, [authUser, isCheckingAuth]);

  return (
    <div className="main-container bg-violet-50">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            color: "var(--fallback-bc,oklch(var(--bc)))",
          },
        }}
        className="bg-sky-200"
      />
    </div>
  );
}
