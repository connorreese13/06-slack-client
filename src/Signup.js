import React from "react";
import axios from "axios";

class Signup extends React.Component {
  // Data
  state = {
    name: "",
    email: "",
    password: ""
  };
  // Methods
  signup = e => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/users/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
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
  // Render
  render() {
    return (
      <form className="card" onSubmit={this.signup}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={e => this.changeInput(e, "name")}
        />
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
          Signup
        </button>
        <div className="link">
          <a href="/login">Already have an account? Login</a>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default Signup;
