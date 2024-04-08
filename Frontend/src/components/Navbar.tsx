import React from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "@/constants/labels";

import styles from "@/styles/navbar.module.scss";

const Navbar = () => {
  const navbarList = navbarLinks.map((link) => {
    return (
      <li className={styles["li-item"]} key={link.url}>
        <NavLink
          to={link.url}
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
          className={styles["li-item"]}
        >
          {link.title}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={styles["navbar-container"]}>
      <div>Image Analyzer</div>
      <nav className={styles["navbar-links"]}>
        <ul>{navbarList}</ul>
      </nav>
      <div>My Account</div>
    </div>
  );
};

export default Navbar;
