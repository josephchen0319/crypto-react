import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo3@2x.png";
import Sidenav from "./Sidenav";
import NavContent from "./NavContent";

const Navbar = () => {
  return (
    <div>
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          <Link to="/" className="brand-logo center black-text">
            <div className="valign-wrapper">
              <img
                src={logo}
                className="responsive-img navbar-logo"
                alt="logo"
              />
              <span>&nbsp;cryptocracy</span>
            </div>
          </Link>
          <Link
            data-target="mobile-view"
            className="sidenav-trigger black-text"
            to="#"
          >
            menu
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link className="black-text" to="/signup">
                SignUp
              </Link>
            </li>
            <li>
              <Link className="black-text" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Sidenav />
      <NavContent />
    </div>
  );
};

export default Navbar;
