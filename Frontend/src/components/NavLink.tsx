import React from "react";
import { NavLink as NavlinkBase, NavLinkProps } from "react-router-dom";

import styles from "@/styles/navlink.module.scss";

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    return (
      <NavlinkBase
        ref={ref}
        {...props}
        className={({ isActive }) =>
          `${styles["navlink-base-container"]} ${
            isActive ? `${styles["active"]}` : ""
          }`
        }>
        {props.children}
      </NavlinkBase>
    );
  }
);
