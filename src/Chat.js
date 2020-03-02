import React, { Component } from "react";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";

class Chat extends Component {
  state = {
    channelID: ""
  };
  getChannel = id => {
    this.setState({ channelID: id });
  };

  // Render
  render() {
    return (
      <div id="wrap">
        <Sidebar history={this.props.history} channel={this.getChannel} />
        <Messages channel={this.state.channelID} />
      </div>
    );
  }
}

export default Chat;
