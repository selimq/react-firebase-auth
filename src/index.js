import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
