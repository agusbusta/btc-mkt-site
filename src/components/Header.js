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
            <a href="https://coinstrategyconnect.com/">Home</a>
          </li>
          <li>
            <a href="https://coinstrategyconnect.com/coinstrategyconnectcom#section-izolPq8JCt">Identity</a>
          </li>
          <li>
            <a href="https://coinstrategyconnect.com/coinstrategyconnectcom#divider-48B7fb2Okc">Advantage</a>
          </li>
          <li>
            <a href="https://coinstrategyconnect.com/coinstrategyconnectcom#divider-piQjGm1689">Approach</a>
          </li>
          <li>
            <a href="https://coinstrategyconnect.com/coinstrategyconnectcom#divider-Sm4omkcFdB">Influence</a>
          </li>
          <li>
            <a href="https://coinstrategyconnect.com/coinstrategyconnectcom#divider--dAJmcTw73">Contact</a>
          </li>
          <li>
            <a href="https://www.allcryptonews.co/1">News</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
