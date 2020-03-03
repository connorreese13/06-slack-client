import React, { Component } from "react";
import "./styles/Sidebar.css";
import axios from "axios";

class Sidebar extends Component {
  // Data
  state = {
    workspace: "Tortuga Coders",
    user: "",
    channels: []
  };
  // Lifecycle
  componentWillMount() {
    this.setState({ user: localStorage.getItem("name") });
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    axios
      .get(`${process.env.REACT_APP_API}/channels`, config)
      .then(response => {
        let channels = response.data;
        channels[0].active = true;
        this.setState({ channels });
        this.props.channel(channels[0]._id);
      })
      .catch(err => {
        console.log("not authorized");
      });
  }
  // Methods
  logout = () => {
    this.props.history.push("/login");
    localStorage.removeItem("token");
  };
  selectChannel = e => {
    let channels = this.state.channels;
    channels.map(c => (c.active = false));
    channels.find(c => c._id === e).active = true;
    let selected = channels.find(c => c._id === e);
    this.setState({ channels });
    this.props.channel(selected._id);
  };

  // Render
  render() {
    return (
      <div id="sidebar">
        <h2>{this.state.workspace}</h2>
        <h3> Welcome, {this.state.user} </h3>
        <ul className="list-unstyled">
          {this.state.channels.map(channel => {
            return (
              <li
                key={channel._id}
                className={channel.active ? "active" : ""}
                onClick={() => this.selectChannel(channel._id)}
              >
                # {channel.name}
              </li>
            );
          })}
        </ul>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Sidebar;
