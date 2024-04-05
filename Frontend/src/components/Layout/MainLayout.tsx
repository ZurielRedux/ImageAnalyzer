import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <div>
      <h3>Main Layout</h3>
      {children || <Outlet />}
    </div>
  );
};

export default MainLayout;
