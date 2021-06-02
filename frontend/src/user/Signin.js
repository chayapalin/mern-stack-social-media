import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { signin, authenticate } from '../auth'

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false
    }
  }

  handleChange = (emailPassword) => (event) => {
    this.setState({ [emailPassword]: event.target.value })
    this.setState({ error: "" })
  }

  clickSignin = event => {
    event.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true })
        })
      }
    })
  }

  signinForm = (email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
        </div>
        <br />
        <button onClick={this.clickSignin} className="btn btn-primary">
          Signin
          </button>
      </form>
    )
  }

  render() {

    if (this.state.redirectToReferer) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>

        {/* show error message */}
        <div className="alert alert-danger" style={{ display: this.state.error ? "" : "none" }}>
          {this.state.error}
        </div>

        {this.signinForm(this.state.email, this.state.password)}

      </div>
    )
  }
}

export default Signin
