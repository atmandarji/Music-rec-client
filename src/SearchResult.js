import React, { Component } from "react";
import { Icon, Card, Modal, Button } from "antd";
import axios from "axios";

const BASE_URL =
  "http://ec2-13-126-103-204.ap-south-1.compute.amazonaws.com:5000";

class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      popupVisible: false,
      history: [],
      historyLoading: false
    };
  }

  hidePopup = () => {
    this.setState({ popupVisible: false });
  };

  showPopup = () => {
    this.setState({ popupVisible: true });
    this.getUserHistory();
  };

  getUserHistory = () => {
    this.setState({ historyLoading: true });

    axios
      .get(`${BASE_URL}/user/history`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.setState({ history: data.history, historyLoading: false });
      })
      .catch(err => {
        this.setState({ historyLoading: false });
        console.log(err);
      });
  };

  redirectToArtistLink = link => {
    window.open(link, "_blank");
  };

  renderList = artist => (
    <div
      style={{
        marginRight: "20px",
        display: "inline-block",
        marginBottom: "20px",
        cursor: "pointer"
      }}
      key={`${artist.mbid}${artist.name}`}
    >
      <Card
        title={artist.name}
        bordered={false}
        style={{ width: 320 }}
        onClick={() => this.redirectToArtistLink(artist.url)}
      >
        <p>Listeners: {artist.listeners}</p>
      </Card>
    </div>
  );

  renderPopup = popupVisible => {
    const historyItem =
      this.state.history.length > 0
        ? this.state.history.map(item => {
            return <li key={item._id}>{item.artist}</li>;
          })
        : null;

    return (
      <Modal
        title="History"
        visible={popupVisible}
        onOk={this.hidePopup}
        onCancel={this.hidePopup}
      >
        {this.state.historyLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Icon type="loading" theme="outlined" />
          </div>
        ) : (
          <ul>{historyItem}</ul>
        )}
      </Modal>
    );
  };

  render() {
    const {
      topTrackList,
      isSearching,
      oldSearches,
      error,
      similarArtistList
    } = this.props;

    const { popupVisible, history } = this.state;
    const hasArtistList = topTrackList.length > 0;

    const topTracks = (
      <div>
        <h1>Top Tracks</h1>
        {topTrackList.map(this.renderList)}
      </div>
    );

    const similarArtist = (
      <div>
        <h1>Similar Artists</h1>
        {similarArtistList.map(this.renderList)}
      </div>
    );

    if (isSearching) {
      return (
        <div>
          <div className="button_container">
            <Button type="primary" onClick={this.showPopup}>
              History
            </Button>
          </div>
          {this.renderPopup(popupVisible)}
          <div className="search_result_container center_element">
            <Icon type="loading" theme="outlined" />
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.renderPopup(popupVisible)}
        <div className="button_container">
          <Button type="primary" onClick={this.showPopup}>
            History
          </Button>
        </div>
        <div className="search_result_container">
          {hasArtistList ? (
            topTracks
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "32px",
                paddingTop: "75px"
              }}
            >
              {error ? error : "Search for the artist..."}
            </p>
          )}
        </div>
        {hasArtistList ? (
          <div className="search_result_container">{similarArtist}</div>
        ) : null}
      </div>
    );
  }
}

export default SearchResult;
