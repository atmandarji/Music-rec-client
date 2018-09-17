import React, { Component } from "react";

import "antd/dist/antd.min.css";
import "./App.css";

import Header from "./Header";
import SearchResult from "./SearchResult";

class App extends Component {
  constructor() {
    super();
    this.state = {
      topTrackList: [],
      similarArtistList: [],
      isSearching: false,
      oldSearches: [],
      error: null
    };
  }

  onSearchArtist = result =>
    this.setState({
      topTrackList: result.toptracks.track,
      similarArtistList: result.similarartists.artist,
      isSearching: false,
      error: null
    });

  setSearching = isSearching => this.setState({ isSearching });

  setError = error => this.setState({ error });

  onLogout = () => {
    this.props.history.replace("/");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
  };

  render() {
    const {
      topTrackList,
      isSearching,
      oldSearches,
      error,
      similarArtistList
    } = this.state;

    return (
      <div className="app_contianer">
        <Header
          onSearchArtist={this.onSearchArtist}
          setSearching={this.setSearching}
          setError={this.setError}
          onLogout={this.onLogout}
        />
        <SearchResult
          topTrackList={topTrackList}
          similarArtistList={similarArtistList}
          isSearching={isSearching}
          oldSearches={oldSearches}
          error={error}
        />
      </div>
    );
  }
}

export default App;
