import React, { useEffect } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import SearchForm from "../forms/SearchForm";

const Sidenav = () => {
  useEffect(() => {
    let elems = document.querySelectorAll(".sidenav");
    let options = {};
    M.Sidenav.init(elems, options);
  });

  let classes = ["large-input"];

  return (
    <ul className="sidenav" id="mobile-view">
      <li>
        <SearchForm classes={classes} />
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/screener">Screener</Link>
      </li>
      <li>
        <Link to="/trending">Trending</Link>
      </li>
      <li>
        <Link to="/community">Community</Link>
      </li>
      <li>
        <Link to="/signup">SignUp</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
};

export default Sidenav;
