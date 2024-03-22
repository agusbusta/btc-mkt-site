import React from "react";
import logo from "../assets/LogoCS.png";

function Footer() {
  return (
    <header>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} className="logo" alt="logo" />
        <ul className="navbarLis">
          <li>
            <a href="#home">Information</a>
          </li>
          <li>
            <a href="#home">Information</a>
          </li>
         
        </ul>
      </nav>
    </header>
  );
}

export default Footer;
