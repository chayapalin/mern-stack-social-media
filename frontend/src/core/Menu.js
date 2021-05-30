import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'

const Menu = () => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand">Recipe Sharing</Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              {!isAuthenticated() && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  </li>
                </React.Fragment>
              )}

              {isAuthenticated() && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link">{isAuthenticated().user.name}</Link>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => signout(() => { <Redirect to="/" /> })}
                    >
                      Sign Out
                    </span>
                  </li>
                </React.Fragment>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Menu