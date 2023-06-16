import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import "react-day-picker/dist/style.css";
import { ToastContainer } from 'react-toastify';
 

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
}

export default App;
