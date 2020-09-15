import React, { Component } from "react";
import SignupForm from "../components/forms/SignupForm";

class Signup extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="center-align">Signup</h1>
        <SignupForm />
      </div>
    );
  }
}

export default Signup;
