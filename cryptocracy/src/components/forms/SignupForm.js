import React from "react";
import { Link } from "react-router-dom";

const SignupForm = ({ classes }) => {
  // const handleEnter = (event) => {
  //   if (event.key === "Enter") {
  //     let input = event.target.value;
  //     // Search for particular coin
  //     console.log(input);
  //   }
  // };

  return (
    <div className="row">
      <form className="col s6 offset-s3">
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" className="validate" />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" className="validate" />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input id="username" type="email" className="validate" />
            <label htmlFor="username">username</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="confirm-password" type="password" className="validate" />
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>
        </div>
        <Link to="/" className="signup-link black-text">
          <h5>signup</h5>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
