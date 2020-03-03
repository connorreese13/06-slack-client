import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  // Data
  state = {
    email: "",
    password: ""
  };
  // Methods
  login = e => {
    e.preventDefault();
    let password = this.state.password;
    let email = this.state.email;
    if (email !== "" && password !== "") {
      axios
        .post(`${process.env.REACT_APP_API}/users/login`, {
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          if (response.data.length > 25) {
            console.log(response.data);
            localStorage.setItem("token", response.data);
            this.props.history.push("/");
          } else {
            console.log(response);
            console.log("Nope");
          }
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return this.setState({
        error: "All fields are required"
      });
    }
  };
  changeInput = (e, field) => {
    let x = this.state;
    x[field] = e.target.value;
    this.setState(x);

    console.log(this.state);
  };

  throwError = e => {};
  // Render
  render() {
    return (
      <form className="card" onSubmit={this.login}>
        <input
          type="text"
          placeholder="Email"
          onChange={e => this.changeInput(e, "email")}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => this.changeInput(e, "password")}
        />
        <button type="submit" className="positive">
          Login
        </button>
        <div className="link">
          <a href="/signup">New here? Create an account</a>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default withRouter(Login);
