import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import "antd/dist/antd.min.css";
import "./App.css";

import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      topTrackList: [],
      isSearching: false,
      oldSearches: [],
      isLoggedin: false
    };
  }

  onSearchArtist = result =>
    this.setState({
      topTrackList: result.artistmatches.artist,
      isSearching: false
    });

  setSearching = isSearching => this.setState({ isSearching });

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
