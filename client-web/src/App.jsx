import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

const App = () => {
  const isAuthorized = localStorage.getItem("isAuthorized");

  return (
    <>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="rtl/*" element={<RtlLayout />} />
        {isAuthorized ? (
          <Route path="/" element={<Navigate to="/admin" replace />} />
        ) : (
          <Route path="/" element={<Navigate to="/auth" replace />} />
        )}
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        hideProgressBar={true}
      />
    </>
  );
};

export default App;
