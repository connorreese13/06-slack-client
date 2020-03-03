import React, { Component } from "react";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import axios from "axios";

class Chat extends Component {
  state = {
    channelID: "5e574d3c07e3bb6b6700f503",
    messages: []
  };

  getChannel = id => {
    this.setState({ channelID: id }, () => this.filterMessage());
  };

  filterMessage = () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios
      .get(
        `${process.env.REACT_APP_API}/messages?channel=${this.state.channelID}`,
        config
      )
      .then(res => {
        console.log("res.data in chat", res.data);
        this.setState({ messages: res.data });
      });
  };

  componentWillMount() {}

  // Render
  render() {
    return (
      <div id="wrap">
        <Sidebar history={this.props.history} channel={this.getChannel} />
        <Messages
          channel={this.state.channelID}
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default Chat;
