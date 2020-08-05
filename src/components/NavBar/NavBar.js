import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const NavBar = (props) => {
  const items = [
    { name: "Users", link: "/users" },
    { name: "Books", link: "/books" },
    { name: "API", link: "/api" },
  ];
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        {items.map((item, index) => (
          <Link to={item.link} key={index} style={{ textDecoration: 'none', }}>
            <Button style={{color:"white"}} key={index}>{item.name}</Button>
          </Link>
        ))}
      </Toolbar>
    </AppBar>

  );
};

export default NavBar;
