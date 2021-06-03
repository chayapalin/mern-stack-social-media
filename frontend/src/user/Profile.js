import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { read } from './apiUser';
import DefaultProfileImage from '../images/default.jpg'
import DeleteUser from './DeleteUser';

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

  componentWillReceiveProps(props) {
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  render() {

    const { redirectToSignin, user } = this.state
    if (redirectToSignin) {
      return <Redirect to="/signin" />
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5"
              src={DefaultProfileImage}
              alt={user.name}
              style={{ width: "100%", height: "15vw", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6">
            <div className="lead">
              <p>Hello {user.name}</p>
              <p>Email {user.email}</p>
              <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
            </div>

            {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-outline-dark me-3"
                  to={`/user/edit/${this.state.user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
