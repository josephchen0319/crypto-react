import React from "react";
import { useMutation } from "@apollo/client";
import Loading from "../misc/Loading";
import { LOGIN } from "../../mutations/member";
import { useHistory } from "react-router-dom";

const LoginForm = ({ classes }) => {
  let input_data = {};
  let history = useHistory();

  const [tokenAuth, { loading, error }] = useMutation(LOGIN, {
    onCompleted({ tokenAuth }) {
      localStorage.setItem("token", tokenAuth.token);
      history.push("/");
      // client.writeQuery({ query: LOGIN, data: { isLoggedIn: true } });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    tokenAuth({
      variables: input_data,
    })
      .then((result) => {
        input_data = {};
      })
      .catch((error) => {});
  };

  const handleInput = (e) => {
    let target = e.target;
    input_data[target.name] = target.value.trim();
  };

  const form = (error_message = "") => {
    return (
      <div className="row">
        <form className="col s6 offset-s3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="username"
                type="text"
                name="username"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="username">username</label>
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
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row valign-wrapper">
            <div className="col s3">
              <button className="btn-unset-style">
                <h5>login</h5>
              </button>
            </div>
            <div className="col s9 red-text">{error_message}</div>
          </div>
        </form>
      </div>
    );
  };

  if (error) {
    let error_message = "Make sure your username or password are correct";
    return form(error_message);
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

  return form();
};

export default LoginForm;
