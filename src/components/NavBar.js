import React from "react";
import { Toolbar} from "@mui/material";
import logo from "../images/TC_no_background.png";
import "../index.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ logout }) => {
  return (
    <nav>
      <div position="static" className="NavBar">
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
          <div style={{ "marginLeft": "33px" }}>
            <NavLink to="/" className="nav-link">
              <h2>Home</h2>
            </NavLink>
          </div>
          <div style={{ "marginLeft": "33px" }}>
            <NavLink to="/banking" className="nav-link">
              <h2>Banking</h2>
            </NavLink>
          </div>
          <div style={{ "marginLeft": "33px" }}>
            <h2 onClick={() => logout()}> Logout </h2>
          </div>
        </Toolbar>
      </div>
    </nav>
  );
};

export default Navbar;
