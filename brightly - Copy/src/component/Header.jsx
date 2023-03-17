import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Header = () => {
  const navHandler = ({ isActive }) => {
    return {
      textDecoration: "none",
      fontWeight: isActive ? "bold" : "normal",
    };
  };
  return (
    <div className="header">
      <nav className="headerLink">
        <NavLink className="headerLinkItems" style={navHandler} to={"/Home"}>
          Home
        </NavLink>
        <NavLink className="headerLinkItems" style={navHandler} to={"/"}>
          Products
        </NavLink>
        <NavLink className="headerLinkItems" style={navHandler} to={"/About"}>
          About
        </NavLink>
      </nav>
    </div>
  );
};
export default Header;
