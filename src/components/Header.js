import React from "react";
import logo from "../assets/LogoCS.png";

function Header() {
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
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#home">Identity</a>
          </li>
          <li>
            <a href="#home">Advantage</a>
          </li>
          <li>
            <a href="#home">Approach</a>
          </li>
          <li>
            <a href="#home">Influence</a>
          </li>
          <li>
            <a href="#home">Contact</a>
          </li>
          <li>
            <a href="#home">News</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
