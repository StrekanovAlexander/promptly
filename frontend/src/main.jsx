import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ApiStatusProvider } from "./context/ApiStatusContext.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { FiltersProvider } from "./context/FiltersContext.jsx";
import Routing from "./routes/index.jsx";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiStatusProvider>
        <AuthProvider>
          <GlobalProvider>
            <FiltersProvider>
              <Routing />
              <Toaster position="top-right" reverseOrder={false} />
            </FiltersProvider>
          </GlobalProvider>
        </AuthProvider>
      </ApiStatusProvider>
    </BrowserRouter>
  </React.StrictMode>
);