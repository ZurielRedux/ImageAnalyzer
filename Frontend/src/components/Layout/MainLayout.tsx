import Navbar from "../Navbar";
import { MainLayoutProps } from "@/ts/interfaces/layout";
import { Outlet } from "react-router-dom";

import styles from "@/styles/main-layout.module.scss";

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <div className={styles["main-layout-container"]}>
      <Navbar />
      <div className={styles["outlet-component-container"]}>
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default MainLayout;
