import React, { Component } from "react";
import "./styles/Sidebar.css";
import axios from "axios";

class Sidebar extends Component {
  // Data
  state = {
    workspace: "Tortuga Coders",
    channels: []
  };
  // Lifecycle
  componentWillMount() {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios
      .get(`${process.env.REACT_APP_API}/channels`, config)
      .then(response => {
        console.log(response.data);
        this.setState({ channels: response.data });
      });
  }
  // Methods
  logout = () => {
    this.props.history.push("/login");
    localStorage.removeItem("token");
  };
  selectChannel = () => {};
  // Render
  render() {
    return (
      <div id="sidebar">
        <h2>{this.state.workspace}</h2>
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
