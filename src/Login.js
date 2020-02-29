import React from "react";
import axios from "axios";

class Login extends React.Component {
  // Data
  state = {
    email: "",
    password: ""
  };
  // Methods
  login = e => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/users/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("token", response.data);
          this.props.history.push("/");
        } else {
          console.log("Nope");
        }
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
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

export default Login;
