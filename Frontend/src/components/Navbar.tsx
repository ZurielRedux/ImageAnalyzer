import { NavLink } from "react-router-dom";
import { navbarLinks } from "@/constants/labels";

import styles from "@/styles/navbar.module.scss";

const Navbar = () => {
  const navbarList = navbarLinks.map((link) => {
    return (
      <li className={styles["li-item"]} key={link.url}>
        <NavLink
          to={link.url}
          className={({ isActive }) => (isActive ? styles["active"] : "")}
        >
          {link.title}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={styles["navbar-container"]}>
      <NavLink className={styles["logo-item"]} to={"/"}>
        Imjür Analyzer
      </NavLink>
      <nav className={styles["navbar-links"]}>
        <ul>{navbarList}</ul>
      </nav>
    </div>
  );
};

export default Navbar;
