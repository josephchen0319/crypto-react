import React from "react";
import { useMutation } from "@apollo/client";
import Loading from "../misc/Loading";
import { SIGNUP } from "../../mutations/member";
import { useHistory } from "react-router-dom";
import { makeVar } from "@apollo/client";

export const status = makeVar({});

const SignupForm = ({ classes }) => {
  let input_data = {};
  let history = useHistory();

  const [createMember, { loading, error }] = useMutation(SIGNUP);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMember({
      variables: input_data,
    })
      .then((result) => {
        input_data = {};
        status({
          register_status: "Successfully registered",
        });
        history.push("/login");
      })
      .catch((error) => {});
  };

  const handleInput = (e) => {
    let target = e.target;
    input_data[target.name] = target.value.trim();
  };

  let error_message = {};

  const form = (error_message = "") => {
    return (
      <div className="row">
        <form className="col s6 offset-s3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="first_name"
                type="text"
                name="firstName"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input
                id="last_name"
                type="text"
                name="lastName"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                name="email"
                className="validate"
                onChange={handleInput}
                required
              />
              <label htmlFor="email">*Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="username"
                type="text"
                name="username"
                className="validate"
                onChange={handleInput}
                required
              />
              <label htmlFor="username">*username</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                name="password"
                className="validate"
                onChange={handleInput}
                required
              />
              <label htmlFor="password">*Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="confirm-password"
                type="password"
                className="validate"
                name="confirmPassword"
                onChange={handleInput}
                required
              />
              <label htmlFor="confirm-password">*Confirm Password</label>
            </div>
          </div>
          <div className="row valign-wrapper">
            <div className="col s3">
              <button className="btn-unset-style">
                <h5>Signup</h5>
              </button>
            </div>
            <div className="col s9 red-text">{error_message}</div>
          </div>
        </form>
      </div>
    );
  };

  if (error) {
    return form(error.message);
  }

  if (loading) {
    return (
      <div className="row">
        <div className="col s6 offset-s3 center-align">
          <Loading size="big" />
        </div>
      </div>
    );
  }
  return form("");
};

export default SignupForm;
