import React, { Component } from "react";
import { Input, Button, Spin, Icon } from "antd";
import axios from "axios";

import "./App.css";

const API = {
  login: "login",
  signup: "signup"
};

const BASE_URL =
  "http://ec2-13-126-103-204.ap-south-1.compute.amazonaws.com:5000";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      userID: null,
      password: null,
      username: null,
      isLoading: false,
      error: null
    };
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}/verify`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        this.props.history.replace("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  }

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = authType => {
    let authData = {
      userid: this.state.userID,
      password: this.state.password
    };
    if (authType === "Signup") {
      authData = {
        ...authData,
        name: this.state.username
      };
    }
    this.setState({ isLoading: true, error: null });

    axios
      .post(
        `${BASE_URL}/user/${authType === "Signup" ? API.signup : API.login}`,
        {
          authData: authData
        }
      )
      .then(({ data }) => {
        localStorage.setItem("name", data.name);
        localStorage.setItem("token", data.token);
        this.setState({ isLoading: false });
        this.props.history.push("/dashboard");
      })
      .catch(({ response: { data } }) => {
        this.setState({ error: data.message, isLoading: false });
      });
  };

  toggle = () => {
    this.setState(prevState => ({
      signup: !prevState.signup,
      username: null,
      error: null
    }));
  };

  render() {
    const ButtonTitle = this.state.signup ? "Signup" : "Login";
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <div className="login_wrapper">
        <h1 style={{ textAlign: "center" }}>{ButtonTitle} Here</h1>
        <Input
          placeholder="User ID"
          name="userID"
          className="input_wrapper"
          onChange={this.onInputChange}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          className="input_wrapper"
          onChange={this.onInputChange}
        />
        {this.state.signup ? (
          <Input
            type="password"
            placeholder="Full name"
            name="username"
            className="input_wrapper"
            onChange={this.onInputChange}
          />
        ) : null}
        {this.state.error ? (
          <div style={{ textAlign: "center", color: "red" }}>
            {this.state.error}
          </div>
        ) : null}
        <div className="submit_wrapper">
          {this.state.isLoading ? (
            <Spin indicator={antIcon} />
          ) : (
            <Button type="primary" onClick={() => this.onSubmit(ButtonTitle)}>
              {ButtonTitle}
            </Button>
          )}
        </div>
        {this.state.signup ? (
          <div className="submit_wrapper">
            Already have an account?
            <a onClick={this.toggle}> Login</a>
          </div>
        ) : (
          <div className="submit_wrapper">
            Don't have an account?
            <a onClick={this.toggle}> Signup</a>
          </div>
        )}
      </div>
    );
  }
}

export default LoginPage;
