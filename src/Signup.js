import React from "react";

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
    this.props.history.push("/");
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
