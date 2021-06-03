import React, { Component } from 'react'
import { signup } from '../auth'
import { Link } from 'react-router-dom'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    }
  }

  //  high order function that receives 2 params which are a string from onChnage and event
  handleChange = (nameEmailPassword) => (event) => {
    // set each state
    this.setState({ [nameEmailPassword]: event.target.value })
    // clear error when there's a change
    this.setState({ error: "" })
  }

  // click the submit button and make a Post request to the backend to create a new user
  clickSubmit = (event) => {
    event.preventDefault()
    // create a new user object and set the current state to it
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    signup(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error })
      }
      else {
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          open: true
        })
      }
    })
  }

  signupForm = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input onChange={this.handleChange("name")} type="text" className="form-control" value={name} />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
        </div>
        <br />
        <button onClick={this.clickSubmit} className="btn btn-primary">
          Submit
          </button>
      </form>
    )
  }

  render() {
    const { name, email, password, error, open } = this.state
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        {/* show error message */}
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
          {error}
        </div>

        {/* show successful message */}
        <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
          Your account is successfully created. Please <Link to="/signin">sign in</Link>
        </div>

        {this.signupForm(name, email, password)}
      </div>
    )
  }
}

export default Signup
