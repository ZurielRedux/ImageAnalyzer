import React from "react";
import Navbar from "../Navbar";
import { MainLayoutProps } from "@/ts/interfaces/layout";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <div>
      <Navbar />
      <h3>Main Layout</h3>
      {children || <Outlet />}
    </div>
  );
};

export default MainLayout;
