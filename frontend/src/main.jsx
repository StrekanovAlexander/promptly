import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Routing from "./routes/index.jsx";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);