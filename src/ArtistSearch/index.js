import React, { Component } from "react";
import { Input } from "antd";
import axios from "axios";

const Search = Input.Search;

const BASE_URL = "https://musicrec-server-cl.herokuapp.com";

class ArtistSearch extends Component {
  onSearch = value => {
    this.props.setSearching(true);

    axios
      .get(`${BASE_URL}/search?artist=${value}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(({ data: { result } }) => {
        this.props.setSearching(false);
        result.toptracks
          ? this.props.onSearchArtist(result)
          : this.props.setError(result.message);
      })
      .catch(err => {
        this.props.setSearching(false);
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Search
          placeholder="Search your artist here..."
          onSearch={this.onSearch}
          enterButton
          style={{ width: "400px", marginRight: "10px" }}
        />
      </div>
    );
  }
}

export default ArtistSearch;
