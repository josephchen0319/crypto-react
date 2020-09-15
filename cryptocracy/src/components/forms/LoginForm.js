import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ classes }) => {
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
        <Link to="/" className="login-link black-text">
          <h5>login</h5>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
