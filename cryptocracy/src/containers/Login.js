import React, { Component } from "react";
import LoginForm from "../components/forms/LoginForm";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="center-align">Login</h1>
        <LoginForm />
      </div>
    );
  }
}
export default Login;
