import React, { Component } from "react";
import LoginForm from "../components/forms/LoginForm";
import { Modal } from "../components/misc/Modal";
import { status } from "../components/forms/SignupForm";
import { isNonEmptyArray } from "@apollo/client/utilities";

class Login extends Component {
  render() {
    return "register_status" in status() ? (
      <div className="container">
        <h1 className="center-align">Login</h1>
        <Modal header={status().register_status} status="register_status" />
        <LoginForm />
      </div>
    ) : (
      <div className="container">
        <h1 className="center-align">Login</h1>
        <LoginForm />
      </div>
    );
  }
}
export default Login;
