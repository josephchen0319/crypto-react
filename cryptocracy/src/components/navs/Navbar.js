import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo3@2x.png";
import Sidenav from "./Sidenav";
import NavContent from "./NavContent";
import { useApolloClient } from "@apollo/client";
import { IS_LOGGED_IN } from "../../queries/current_state";
import { useHistory } from "react-router-dom";

const Navbar = ({ displayContent }) => {
  const client = useApolloClient();
  const { isLoggedIn } = client.readQuery({
    query: IS_LOGGED_IN,
  });
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    client.resetStore();
    localStorage.clear();
    history.push("/");
  };

  let guest_nav = () => {
    return (
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
    );
  };

  let logged_in_nav = () => {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <Link className="black-text" to="/notification">
            Notification
          </Link>
        </li>
        <li>
          <Link className="black-text" to="/following">
            Following
          </Link>
        </li>
        <li>
          <Link className="black-text" to="/saved">
            Saved
          </Link>
        </li>
        <li>
          <Link className="black-text" to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };

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
          {isLoggedIn ? logged_in_nav() : guest_nav()}
        </div>
      </nav>
      <Sidenav />
      <NavContent />
    </div>
  );
};

export default Navbar;
