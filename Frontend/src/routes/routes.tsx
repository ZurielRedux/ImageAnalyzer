import { RouteObject, useRoutes } from "react-router-dom";
import Signin from "@/pages/Signin";
import AuthLayout from "@/components/Layout/AuthLayout";
import MainLayout from "@/components/Layout/MainLayout";
import Analyze from "@/pages/Analyze";
import Dashboard from "@/pages/Dashboard";

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
        { path: "/", element: <Dashboard /> },
        { path: "/analyze", element: <Analyze /> },
      ],
    },
  ];

  return useRoutes(routes);
};

export default Router;
