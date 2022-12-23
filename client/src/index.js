import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Callback from "./Callback";
import Congrats from "./Congrats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/callback",
    element: <Callback />,
  },

  {
    path: "/congrats",
    element: <Congrats />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
