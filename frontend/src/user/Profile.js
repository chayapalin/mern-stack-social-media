import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { read } from './apiUser';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: "",
      redirectToSignin: false
    }
  }

  init = (userId) => {
    const token = isAuthenticated().token
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true })
      } else {
        this.setState({ user: data }) // put this data into the state
      }
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  render() {

    const { redirectToSignin } = this.state
    if (redirectToSignin) {
      return <Redirect to="/signin" />
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>Hello {isAuthenticated().user.name}</p>
            <p>Email {isAuthenticated().user.email}</p>
            <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
          </div>

          <div className="col-md-6">
            {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
              <div className="d-inline-block mt-5">
                <Link
                  className="btn btn-raised btn-outline-dark me-3"
                  to={`/user/edit/${this.state.user._id}`}
                >
                  Edit Profile
                </Link>
                <button className="btn btn-raised btn-outline-danger">
                  Delete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
