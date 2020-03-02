import React, { Component } from "react";
import "./styles/Messages.css";
import "./styles/NewMessage.css";
import axios from "axios";
import moment from "moment";

class Content extends Component {
  // Data
  state = {
    newMessage: {
      text: "",
      file: null
    },
    messages: [],
    channelID: "",
    messagesCopy: []
  };
  // Lifecycle
  componentWillMount() {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios.get(`${process.env.REACT_APP_API}/messages`, config).then(res => {
      this.setState({ messages: res.data });
      this.setState({ messagesCopy: res.data });
    });
  }
  componentWillReceiveProps(props) {
    let channel = props.channel;
    this.setState({ channelID: channel });
    let messages = this.state.messagesCopy;
    messages = messages.filter(message => {
      return message.channel._id == props.channel;
    });
    this.setState({ messages });
  }

  // Methods
  changeText = e => {
    let newMessage = this.state.newMessage;
    newMessage.text = e.target.value;
    this.setState({ newMessage });
  };
  createMessage = e => {
    e.preventDefault();
  };
  // Render
  render() {
    return (
      <div id="messages">
        <div id="content">
          {this.state.messages.map(message => {
            return (
              <div className="message" key={message._id}>
                <span className="user">{message.user.name}</span>
                <span className="date">{message.date}</span>
                <div className="body">{message.text}</div>
                -> Insert Image
              </div>
            );
          })}
        </div>
        <div id="new-message">
          <form
            onSubmit={e => {
              this.createMessage(e);
            }}
          >
            <input type="file" name="file" onChange={this.addFile} />
            <input
              type="text"
              placeholder="New Message..."
              value={this.state.newMessage.text}
              onChange={e => this.changeText(e)}
            />
            <button type="submit" className="positive">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Content;
