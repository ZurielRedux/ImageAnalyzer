import { NavLink } from "react-router-dom";
import { navbarLinks } from "@/constants/labels";

import styles from "@/styles/navbar.module.scss";

const Navbar = () => {
  const navbarList = navbarLinks.map((link) => {
    return (
      <li className={styles["li-item"]} key={link.url}>
        <NavLink
          to={link.url}
          className={({ isActive }) => (isActive ? styles["active"] : "")}>
          {link.title}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["title-row"]}>
        <img src="/imjur_logo_transparent.png" />
        <NavLink className={styles["title"]} to={"/"}>
          <span>Imjür Analyzer</span>
        </NavLink>
      </div>
      <nav className={styles["navbar-links"]}>
        <ul>{navbarList}</ul>
      </nav>
    </div>
  );
};

export default Navbar;
