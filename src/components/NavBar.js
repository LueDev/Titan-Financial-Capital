import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../images/Logo-dark-background.png";
import "../index.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ logout }) => {
  return (
    <nav>
      <AppBar position="static" style={{ backgroundColor: "#100e0c" }}>
        <Toolbar>
          <NavLink to="/" className="nav-link">
            {" "}
            <img
              className="NavBar__logo"
              src={logo}
              alt="Logo"
              style={{ marginRight: "10px" }}
            />
          </NavLink>
          <div style={{ "margin-left": "33px" }}>
            <NavLink to="/" className="nav-link">
              <h2>Home</h2>
            </NavLink>
          </div>
          <div style={{ "margin-left": "33px" }}>
            <NavLink to="/banking" className="nav-link">
              <h2>Banking</h2>
            </NavLink>
          </div>
          <div style={{ "margin-left": "33px" }}>
            <h2 onClick={() => logout()}> Logout </h2>
          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
