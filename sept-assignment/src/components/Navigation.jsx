import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogged: localStorage.getItem("isLogged")
    }
  }

  logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    const user = this.props.user
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <Link style={linkStyle} to="/services">OnlineTutor</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" style={linkStyle} to="/services">
                    Home
                <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={linkStyle} to="/services">Book a service</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={linkStyle} to="/tutors">Tutors</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={linkStyle} to={`/bookings/${localStorage.getItem('userID')}`}>Bookings</Link>
                </li>
                {user.isBO ?
                  (<li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      style={linkStyle}
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >Admin
                  </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/services/admin">Services</Link>
                      <Link className="dropdown-item" to="/tutors/admin">Tutors</Link>
                      <Link className="dropdown-item" to={`/bookingRequests/${localStorage.getItem('userID')}`}>Bookings</Link>
                    </div>
                  </li>) : null}
              </ul>
            </div>

            <div>
              {
                localStorage.getItem("isLogged") ?
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" style={linkStyle} to={`/users/${localStorage.getItem('userID')}`}>{this.props.user.userFname}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" style={linkStyle} to="/login" onClick={this.logout}>Log out</Link>
                    </li>
                  </ul> :
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" style={linkStyle} to="/login">Log in</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" style={linkStyle} to="/register">Register</Link>
                    </li>
                  </ul>
              }
            </div>

          </div>

        </nav>
      </div >
    );
  }
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
}

export default Navigation;
