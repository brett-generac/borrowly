import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/">
        Borrow<span className="ly">ly</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {(props.user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/things/create">
                  Add Thing
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Your Account
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="/">
                    History
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={props.handleSignOut}>
                    Sign Out
                  </button>
                </div>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/sign-in">
                  Sign-In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/sign-up">
                  Sign-Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
