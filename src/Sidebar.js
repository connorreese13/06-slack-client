import React, { Component } from "react";
import "./styles/Sidebar.css";

class Sidebar extends Component {
  // Data
  state = {
    workspace: "Tortuga Coders",
    channels: [
      {
        _id: "1",
        name: "general",
        active: true
      },
      {
        _id: "2",
        name: "announcements"
      },
      {
        _id: "3",
        name: "fun"
      },
      {
        _id: "4",
        name: "random"
      },
      {
        _id: "5",
        name: "coding"
      }
    ]
  };
  // Lifecycle
  componentWillMount() {}
  // Methods
  logout = () => {
    this.props.history.push("/login");
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
