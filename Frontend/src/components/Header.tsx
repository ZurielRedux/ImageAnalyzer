import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "./NavLink";
import { navbarLinks } from "@/constants/labels";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import styles from "@/styles/header.module.scss";

interface IHeader {
  title: string;
  description?: string;
}

const Header = ({ title, description }: IHeader) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const DrawerList = (
    <Box sx={{ width: 200 }}>
      <List>
        {navbarLinks.map((link) => {
          return (
            <ListItem key={link.url} component="div" divider={true}>
              <NavLink to={link.url}>
                <ListItemText primary={link.title} />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const toggleMenu = (newOpen: boolean) => {
    return () => {
      setShowMenu(newOpen);
    };
  };

  return (
    <div className={styles["header-container"]}>
      <div className={styles["title-row"]}>
        <IconButton
          color="primary"
          size="small"
          className={styles["hamburger-menu"]}
          onClick={toggleMenu(true)}>
          <FaBars />
        </IconButton>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>

      {showMenu && (
        <Drawer open={showMenu} onClose={toggleMenu(false)}>
          {DrawerList}
        </Drawer>
      )}
    </div>
  );
};

export default Header;
