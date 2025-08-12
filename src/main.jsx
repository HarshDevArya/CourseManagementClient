import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router.jsx";
import { AuthProvider } from "./state/AuthContext.jsx";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
