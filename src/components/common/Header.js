import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <>
      <nav style={{ display: "inline-block" }}>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Lista zakupów
        </NavLink>
        {" | "}
        <NavLink to={"/products"} activeStyle={activeStyle}>
          Produkty
        </NavLink>
        {" | "}
        <NavLink to="/recipes" activeStyle={activeStyle}>
          Przepisy
        </NavLink>
        {" | "}
        <NavLink to="/stores" activeStyle={activeStyle}>
          Sklepy
        </NavLink>
      </nav>
    </>
  );
};

export default Header;
