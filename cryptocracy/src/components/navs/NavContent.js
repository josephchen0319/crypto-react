import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../forms/SearchForm";

const NavContent = () => {
  return (
    <div className="container nav-content">
      <div className="white row hide-on-med-and-down">
        <Link
          className="black-text center-align col l2 nav-item valign-wrapper"
          to="/"
        >
          Home
        </Link>
        <Link
          className="black-text col l2 nav-item valign-wrapper"
          to="/screener"
        >
          Screener
        </Link>
        <Link
          className="black-text col l2 nav-item valign-wrapper"
          to="/trending"
        >
          Trending
        </Link>
        <Link
          className="black-text col l2 nav-item valign-wrapper"
          to="/community"
        >
          Community
        </Link>
        <div className="col l4">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default NavContent;
