import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SidebarProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0F172A",
              color: "#fff",
              border: "1px solid #334155",
            },
            success: {
              iconTheme: {
                primary: "#22C55E",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />

        <App />
      </SidebarProvider>
    </AuthProvider>
  </React.StrictMode>
);