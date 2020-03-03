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
      file: null,
      channel: this.props.channel
    },
    messages: [],
    channelID: ""
  };
  // Lifecycle
  componentWillMount() {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios.get(`${process.env.REACT_APP_API}/messages`, config).then(res => {
      this.setState({ messages: res.data });
    });
  }
  componentWillReceiveProps(props) {
    this.setState({ messages: props.messages });
    this.setState({ channelID: props.channel });
    let newMessage = this.state.newMessage;
    newMessage.channel = props.channel;
    this.setState({ newMessage });
  }

  // Methods
  changeText = e => {
    let newMessage = this.state.newMessage;
    newMessage.text = e.target.value;
    this.setState({ newMessage });
  };
  createMessage = e => {
    e.preventDefault();
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    let newMessage = this.state.newMessage;
    newMessage.channel = this.state.channelID;
    this.setState({ newMessage });
    axios
      .post(
        `${process.env.REACT_APP_API}/messages`,
        this.state.newMessage,
        config
      )
      .then(response => {
        if (response.data) {
          console.log(response.data);
          let messages = this.state.messages;
          messages.push(response.data);
          this.setState({ messages });
        } else {
          console.log("no");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      newMessage: {
        text: "",
        file: null,
        channel: ""
      }
    });
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
              id="mainInput"
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
