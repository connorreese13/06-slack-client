import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./styles/App.css";
import Chat from "./Chat";
import Login from "./Login";
import Signup from "./Signup";

class App extends Component {
  // Methods
  // Render
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          // <Route path="/" component={Chat} />
          <Route
            path="/"
            render={() =>
              localStorage.getItem("token") ? (
                <Chat />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
