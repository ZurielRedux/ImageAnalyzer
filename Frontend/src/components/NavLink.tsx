import React from "react";
import { NavLink as NavlinkBase, NavLinkProps } from "react-router-dom";

import styles from "@/styles/navlink.module.scss";

// interface ICustomNavLinkProps extends NavLinkProps {
//   className: string;
// }

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    return (
      <NavlinkBase
        ref={ref}
        {...props}
        className={styles["navlink-base-container"]}>
        {props.children}
      </NavlinkBase>
    );
  }
);
