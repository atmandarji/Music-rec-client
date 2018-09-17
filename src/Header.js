import React, { Component } from "react";
import { Button } from "antd";

import "./App.css";

import ArtistSearch from "./ArtistSearch";

class Header extends Component {
  onSearchArtist = results => this.props.onSearchArtist(results);

  setSearching = value => this.props.setSearching(value);

  setError = error => this.props.setError(error);

  onLogout = () => this.props.onLogout();

  render() {
    return (
      <div className="header" style={{ alignItems: "center" }}>
        <h1>Welcome {localStorage.getItem("name")}!</h1>
        <ArtistSearch
          onSearchArtist={this.onSearchArtist}
          setSearching={this.setSearching}
          setError={this.setError}
        />
        <Button type="primary" onClick={this.onLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

export default Header;
