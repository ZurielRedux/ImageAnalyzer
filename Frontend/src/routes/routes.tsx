import * as React from "react";
import { useRoutes } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "@/pages/Login";
// import Signup from "./pages/Signup";
import AuthLayout from "@/components/Layout/AuthLayout";
import MainLayout from "@/components/Layout/MainLayout";
import App from "@/App";

const Router = () =>
  useRoutes([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
      ],
    },
    {
      element: <MainLayout />,
      children: [{ path: "home", element: <App /> }],
    },
  ]);

export default Router;
