import { RouteObject, useRoutes } from "react-router-dom";
// import Home from "./pages/Home";
import Signin from "@/pages/Signin";
import AuthLayout from "@/components/Layout/AuthLayout";
import MainLayout from "@/components/Layout/MainLayout";
import App from "@/App";
import Analyze from "@/pages/Analyze";

const Router = () => {
  const routes: RouteObject[] = [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/sigin",
          element: <Signin />,
        },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        { path: "dashboard", element: <App /> },
        { path: "analyze", element: <Analyze /> },
      ],
    },
  ];

  return useRoutes(routes);
};

export default Router;
